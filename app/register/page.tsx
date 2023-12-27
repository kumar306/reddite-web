'use client';

import { Form, Formik } from 'formik';
import { Wrapper } from '../shared/wrapper';
import { TextField } from '../shared/inputFields';
import { Box, Button } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { RegisterDocument } from '../__generated__/graphql';
import { toErrorMap } from '../lib/toErrorMap';
import { useRouter } from 'next/navigation';

interface RegisterProps {}

// form validations should be completed first 
// form onsubmit should hit gql endpoint - should do by apollo client

const Register:React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [ register, {loading, error, data} ] = useMutation(RegisterDocument);
    return (
        // <h1>In login page!</h1>
        <Wrapper>
            <Formik 
            initialValues={{ username: "", password: "", email: "", firstname: "", lastname: "", confirmPassword: "" }} 
            validationSchema={Yup.object({
                firstname: Yup.string().max(15, 'Max 15 characters').required(),
                lastname: Yup.string().max(15, 'Max 15 characters').required(),
                username: Yup.string().max(20, 'Max 20 characters in username').required('Username required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().min(6, 'Minimum 6 characters allowed').required('Password required'),
                confirmPassword: Yup.string().required('Confirm Password required')
                .oneOf([Yup.ref('password')], 'Password and confirm password does not match')
            })}
            onSubmit={async (values, {setErrors, setStatus}) => {
                const registerResponse = await register({
                    variables: { options: {
                        fname: values.firstname,
                        lname: values.lastname,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword
                    }}
                });
                if(registerResponse.data?.register.errors) {
                    // register.errors is array of {field: '', message: ''}
                    // convert it to an obj of {[field]:[message], ....}
                    setErrors(toErrorMap(registerResponse.data.register.errors));
                } else {
                    // WORKS - user is created and routed to '/' path
                    console.log(registerResponse.data?.register.user);
                    router.push('/login');
                }
            }}>
                {formik => (
                    <Form>
                        <Box py={1}>
                        <TextField name="firstname" label="First Name"></TextField>
                        </Box>
                        <Box py={1}>
                        <TextField name="lastname" label="Last Name"></TextField>
                        </Box>
                        <Box py={1}>
                        <TextField name="username" label="Username"></TextField>
                        </Box>
                        <Box py={1}>
                        <TextField name="email" label="Email"></TextField>
                        </Box>
                        <Box py={1}>
                        <TextField name="password" label="Password" type="password"></TextField>
                        </Box>
                        <Box py={1}>
                        <TextField name="confirmPassword" label="Confirm Password" type="password"></TextField>
                        </Box>
                        <Box py={3} textAlign="center">
                        <Button 
                        type="submit" 
                        colorScheme='blue' 
                        loadingText="Registering..."
                        disabled={!formik.isValid || !formik.dirty}>
                            Register
                        </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Register;
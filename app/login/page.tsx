'use client';

import { Form, Formik } from 'formik';
import { Wrapper } from './wrapper';
import * as Yup from 'yup';
import { TextField } from './inputFields';
import { Box, Button } from '@chakra-ui/react';

interface LoginProps {}

// form validations should be completed first 
// form onsubmit should hit gql endpoint - should do by apollo client


const Login:React.FC<LoginProps> = ({}) => {
    return (
        // <h1>In login page!</h1>
        <Wrapper>
            <Formik 
            initialValues={{ username: "", password: "" }} 
            // validationSchema={Yup.object({
            //     userName: Yup.string().max(20, 'Max 20 characters in username').required('Username required'),
            //     password: Yup.string().required('Password required')
            // })}
            onSubmit={(values) => {
                console.log(values);
            }}>
                {formik => (
                    <Form>
                        <Box py={3}>
                        <TextField name="username" label="username"></TextField>
                        </Box>
                        <Box py={3}>
                        <TextField name="password" label="password" type="password"></TextField>
                        </Box>
                        <Box py={3}>
                        <Button type="submit" colorScheme='blue' loadingText="Logging in..">
                            Login
                        </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Login;
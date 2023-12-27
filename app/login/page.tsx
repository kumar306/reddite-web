'use client';

import { Form, Formik } from 'formik';
import { Wrapper } from '../shared/wrapper';
import { TextField } from '../shared/inputFields';
import { Box, Button, Link } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { IsLoggedInDocument, LoginDocument } from '../__generated__/graphql';
import { toErrorMap } from '../lib/toErrorMap';
import { useRouter } from 'next/navigation';


interface LoginProps {}

// form validations should be completed first 
// form onsubmit should hit gql endpoint - should do by apollo client

//graphql cache refetch queries works on active queries - i.e queries being used in current component
//to update cache after mutation, its best to update the apollo cache directly
const Login:React.FC<LoginProps> = ({}) => {

    const router = useRouter();
    const [login] = useMutation(LoginDocument, {
       update(cache,result) {
            cache.writeQuery({
                query: IsLoggedInDocument,
                data: { isLoggedIn: {
                    user: result.data?.login.user,
                    errors: result.data?.login.errors
                } }
            })
        }
    });

    return (
        <Wrapper>
            <Formik 
            initialValues={{ usernameOrEmail: "", password: "" }} 
            validationSchema={Yup.object({
                usernameOrEmail: Yup.string().max(30, 'Max 30 characters in username').required('Username or Email required'),
                password: Yup.string().required('Password required')
            })}
            onSubmit={async (values, {setErrors}) => {
                const loginResponse = await login({variables: {
                    options: {
                        usernameOrEmail: values.usernameOrEmail,
                        password: values.password
                        },
                    }
                });
                if(loginResponse.data?.login.errors) {
                    setErrors(toErrorMap(loginResponse.data.login.errors));
                    console.log(loginResponse.data.login.errors);
                }
                else {
                    //user logged in and cookie stored in browser, route to '/' path for now
                    console.log(loginResponse.data?.login.user);
                    router.push('/home');
                }
            }}
            >
                {formik => (
                    <Form>
                        <Box py={3}>
                        <TextField name="usernameOrEmail" label="username"></TextField>
                        </Box>
                        <Box py={3}>
                        <TextField name="password" label="password" type="password"></TextField>
                        </Box>
                        <Box py={3}>
                        <Button type="submit" colorScheme='blue' loadingText="Logging in..">
                            Login
                        </Button>
                        <Box py={3}>
                            <Link href="/forgot-password">Forgot Password? Click here</Link>
                        </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Login;
'use client';

import { ChangePasswordDocument, ForgotPasswordDocument } from "@/app/__generated__/graphql";
import { toErrorMap } from "@/app/lib/toErrorMap";
import { TextField } from "@/app/shared/inputFields";
import { Wrapper } from "@/app/shared/wrapper";
import { useMutation } from "@apollo/client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from 'yup';
import { useSearchParams } from "next/navigation";

interface ChangePasswordProps {
    params: {
        token: string
    }
}

const ChangePassword:React.FC<ChangePasswordProps> = ({params}: { params: { token: string } }) => {
    const searchParams = useSearchParams();
    const [completed, setCompleted] = useState(false);
    const [tokenError, setTokenError] = useState('');
    const [changePassword] = useMutation(ChangePasswordDocument);
    return (
        <>
        { completed ? (
            <Box p={4}>
                <Text>
                    The password has been reset succesfully. Please navigate to login page.
                </Text>
                <br></br>
                <Link href="http://localhost:3000/login">Login Page</Link>
            </Box>
        ): (
        <Wrapper>
            <Formik 
            initialValues={{ newPassword: '', confirmNewPassword: '' }} 
            validationSchema={Yup.object({
                newPassword: Yup.string().min(6, 'Minimum 6 characters allowed').required('Password required'),
                confirmNewPassword: Yup.string().required('Confirm Password required')
                .oneOf([Yup.ref('newPassword')], 'Password and confirm password does not match')
            })}
            onSubmit={async (values, {setErrors}) => {
                const changePasswordResponse = await changePassword({
                    variables: {
                        options: {
                            newPassword: values.newPassword,
                            confirmNewPassword: values.confirmNewPassword,
                            token: params.token
                        } 
                    }
                })
                if(changePasswordResponse.data?.changePassword.errors) {
                    const errorMap = toErrorMap(changePasswordResponse.data?.changePassword.errors);
                    if("token" in errorMap) setTokenError(errorMap.token);
                    setErrors(errorMap);
                    console.log(changePasswordResponse.data?.changePassword.errors);
                }
                else {
                    // password changed successfully
                    console.log(changePasswordResponse.data?.changePassword.user);  
                    setCompleted(true);
                }
            }}
            >
                {formik => (
                    <Form>
                        <Box py={3}>
                        <TextField name="newPassword" label="New Password" type="password"></TextField>
                        </Box>
                        <Box py={3}>
                        <TextField name="confirmNewPassword" label="Confirm Password" type="password"></TextField>
                        </Box>
                        <Box py={3}>
                        <Button type="submit" colorScheme='blue' loadingText="Resetting password...">
                            Reset Password
                        </Button>
                        { tokenError ? (
                        <Box py={1}>
                            <Text color="red">Token expired. Please try again at below link</Text>
                            <Link href='/forgot-password'>Token expired?</Link>
                        </Box>
                        ) : null}      
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        )}
        </>
    )
}

export default ChangePassword;
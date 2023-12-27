'use client';

import { ForgotPasswordDocument } from "@/app/__generated__/graphql";
import { toErrorMap } from "@/app/lib/toErrorMap";
import { TextField } from "@/app/shared/inputFields";
import { Wrapper } from "@/app/shared/wrapper";
import { useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import { useState } from "react";
import * as Yup from 'yup';

interface ForgotPasswordProps {

}

const ForgotPassword:React.FC<ForgotPasswordProps> = ({}) => {
    
    const [completed, setCompleted] = useState(false); //after email send completion 
    const [forgotPassword] = useMutation(ForgotPasswordDocument)
    return (
        <>
        { completed ? (
            <Box p={4}>A password reset email has been sent to your email</Box>
        ): (
        <Wrapper>
            <Formik 
            initialValues={{ email: '' }} 
            validationSchema={Yup.object({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={async (values, {setErrors}) => {
                console.log(values);
                const forgotPasswordResponse = await forgotPassword({
                    variables: {
                        email: values.email
                    }
                })
                console.log(forgotPasswordResponse);
                setCompleted(true);
            }}
            >
                {formik => (
                    <Form>
                        <Box py={3}>
                        <TextField name="email" label="email"></TextField>
                        </Box>
                        <Box py={3}>
                        <Button type="submit" colorScheme='blue' loadingText="Sending email..">
                            Send Password Reset Email
                        </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        )}
        </>
    )
}

export default ForgotPassword;
'use client';

import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { TextAreaField, TextField } from "../shared/inputFields";
import { Wrapper } from "../shared/wrapper";
import * as Yup from 'yup';
import { CreatePostDocument, GetAllPostsDocument } from "../__generated__/graphql";
import { useMutation } from "@apollo/client";
import Layout from "../shared/layout";
import { checkIsAuth } from "../lib/checkIsAuth";
import { useRouter } from "next/navigation";

interface CreatePostProps {}

const createPost:React.FC<CreatePostProps> = ({}) => {

    const router = useRouter();
    const [createPost] = useMutation(CreatePostDocument, {
        update(cache,result) {
            cache.modify({
                fields: {
                    GetAllPostsDocument: (prevPosts, modifier) => {
                        return [result.data?.createPost]
                    }
                }
            })
        }
    });
    checkIsAuth();

    return (
        <Layout>
            <Wrapper>
                <Formik 
                initialValues={{ title: '', text: '' }} 
                validationSchema={Yup.object({
                    title: Yup.string().min(6, 'Minimum 6 characters allowed').required('Title required'),
                    text: Yup.string().required('Text required')
                })}
                onSubmit={async (values) => {
                    const createPostResponse = await createPost({
                        variables: {
                            input: {
                                title: values.title,
                                text: values.text
                            }
                        }
                    })

                    console.log(createPostResponse);
                    router.push('/home');
                    
                }}
                >
                    {formik => (
                        <Form>
                            <Box py={3}>
                            <TextField name="title" label="Enter title"></TextField>
                            </Box>
                            <Box py={3}>
                            <TextAreaField name="text" label="Enter post text.."></TextAreaField>
                            </Box>
                            <Box py={3}>
                            <Button type="submit" colorScheme='blue' loadingText="Creating post...">
                                Create Post
                            </Button>      
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Layout>
    )
}

export default createPost;
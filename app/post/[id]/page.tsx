'use client';

import { GetAllPostsDocument, GetPostDocument, Post, UpdatePostDocument } from "@/app/__generated__/graphql";
import createPost from "@/app/create-post/page";
import { TextField, TextAreaField } from "@/app/shared/inputFields";
import Layout from "@/app/shared/layout";
import { Wrapper } from "@/app/shared/wrapper";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import * as Yup from 'yup';

interface SinglePostProps {
    params: {
        id: string
    }
}

const SinglePost: React.FC<SinglePostProps> = ({params} : { params: { id: string }}) => {
    const {data, loading} = useQuery(GetPostDocument, {
        variables: {
            getPostId: parseFloat(params.id)
        }
    });

    const [updatePost, {data: updatePostData}] = useMutation(UpdatePostDocument);

    const searchParams = useSearchParams();
    const editMode: boolean = searchParams.get('edit') == "true" ? true: false; 
    const [isOpen, setIsOpen] = useState(editMode);

    const handleClose = () => {
        setIsOpen(false);
      };

    return (
        <>
            <Layout>
                <Box m={4}>
                    <Text fontSize='4xl'>{data?.getPost?.title}</Text>
                </Box>
                <hr></hr>
                <br></br>
                <Box m={4}>
                    <Text fontSize='md' textAlign={"justify"}>{data?.getPost?.text}</Text>
                </Box>
            </Layout>

            {data?.getPost ? (
                 <Modal isOpen={isOpen} onClose={handleClose}>
                 <ModalOverlay />
                 <ModalContent>
                     <ModalHeader>Update Post</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody>
                         <Wrapper>
                             <Formik
                                 initialValues={{ title: data?.getPost.title, text: data?.getPost.text }}
                                 validationSchema={Yup.object({
                                     title: Yup.string().min(6, 'Minimum 6 characters allowed').required('Title required'),
                                     text: Yup.string().required('Text required')
                                 })}
                                 onSubmit={async (values) => {
                                     await updatePost({
                                        variables: {
                                            input: {
                                                id: data?.getPost!.id,
                                                title: values.title,
                                                text: values.text
                                            }
                                        },
                                        refetchQueries: [GetPostDocument]
                                     })
                                     handleClose(); // close the modal
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
                                             <Button type="submit" colorScheme='blue' loadingText="Updating post...">
                                                 Update Post
                                             </Button>
                                         </Box>
                                     </Form>
                                 )}
                             </Formik>
                         </Wrapper>
                     </ModalBody>
                 </ModalContent>
             </Modal>
            ): (
                null
            )}
           
        </>
    )
}

export default SinglePost;
'use client';

import { GetPostDocument } from "@/app/__generated__/graphql";
import Layout from "@/app/shared/layout";
import { useQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";

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
        </>
    )
}

export default SinglePost;
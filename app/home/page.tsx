// home/page.tsx
'use client';

import Link from "next/link";
import { GetAllPostsDocument, IsLoggedInDocument } from "../__generated__/graphql";
import Layout from "../shared/layout";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { checkIsAuth } from "../lib/checkIsAuth";
import { Vote } from "./vote";

interface HomeProps { }

const Home:React.FC<HomeProps> = ({}) => {

  // apollo query goes from next js server directly (SERVER COMPONENT) instead of reaching browser and then browser making a graphql request
  const skip = useRef(0);
  const limit = useRef(10);
  // use useRef when we want to store a value but doesnt cause re-render on component update
  // dont use let/const as those variables values dont persist across re-renders

  const router = useRouter();

  const {data: getPostsData, loading: getPostsLoading, error: getPostsError, fetchMore: fetchMorePosts } = useQuery(GetAllPostsDocument, {
    variables: {
      options: {
        skip: skip.current,
        limit: limit.current
      }
    },
    onCompleted: (data) => {
      console.log(getPostsData);
      if(skip.current == 0) skip.current += limit.current
    }
  });
 
  // useEffect init run - triggered on getPostsData change
  // on data retrieval, setSkip run - triggers re-render
  // useQuery hook run again with next skip - data changes - useEffect run which updates skip
  // triggers re-render and keeps going..
  // so use 'useRef' hook to prevent re-rendering of value that persists across renders

  const routeToCreatePost = () => {
    router.push('/create-post');
  }

  checkIsAuth();
  
  return (
    <Layout>
      <Flex>
        <Box>
          <Text as='b' fontSize='4xl'>REDDITE</Text>
        </Box>
        <Box ml="auto">
          <Button onClick={routeToCreatePost}>Create Post</Button>
        </Box>
      </Flex>
    
    { !getPostsData?.getAllPosts.posts ? (
      <p>Loading</p>
    ): (
      <>
      <ul>
        {getPostsData?.getAllPosts.posts.map((post) => {    
              return (
                <Card key={post.id} my={3}>
                  <Flex> 
                    <Vote post={post}></Vote>
                    <Box m={2}>
                      <CardHeader as='b'>{post.title}</CardHeader>                  
                      <CardBody>
                        <Text fontSize="sm">Posted by {post.author.username}</Text>
                        <br></br>
                        <Text>{post.textSlice}...</Text>
                      </CardBody>
                    </Box>
                  </Flex>
              </Card>
            ) 
          }
        )}
      </ul>
      <br></br>
      { getPostsData?.getAllPosts.hasMore == true ? (
           <Box py={4} textAlign={'center'}>
           <Button onClick={async() => {        
            await fetchMorePosts({
            variables: {
                options: {
                  skip: skip.current,
                  limit: limit.current,
                }
              },
           });
           skip.current = skip.current + limit.current;
           console.log(getPostsData.getAllPosts);
          }}
          >Load More</Button>
         </Box>
      ): null}
      </>
    )}
    </Layout>
  )
}

export default Home;

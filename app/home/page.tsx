// home/page.tsx
'use client';

import Link from "next/link";
import { DeletePostDocument, GetAllPostsDocument, GetPostDocument, IsLoggedInDocument } from "../__generated__/graphql";
import Layout from "../shared/layout";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { checkIsAuth } from "../lib/checkIsAuth";
import { Vote } from "./vote";
import { DeleteIcon } from "@chakra-ui/icons";

interface HomeProps { }

const Home:React.FC<HomeProps> = ({}) => {

  // apollo query goes from next js server directly (SERVER COMPONENT) instead of reaching browser and then browser making a graphql request
  const skip = useRef(0);
  const limit = useRef(10);
  // use useRef when we want to store a value but doesnt cause re-render on component update
  // dont use let/const as those variables values dont persist across re-renders

  const router = useRouter();
  const [deletePost, {data}] = useMutation(DeletePostDocument, {
    update(cache, {data}) {

      // return the id of the deleted post after delete mutation
      // fetch the current posts present and remove this post from cache and return
      // the cache update should be immutable so created a copy
      
      cache.modify({
        fields: {
            getAllPosts(existingPosts = [], { readField }) {
                let existingPostsCopy = JSON.parse(JSON.stringify(existingPosts));
                existingPostsCopy.posts = [];
                existingPosts.posts.map((post: { "__ref": string }) => {
                    if(post["__ref"] != `Post:${data?.deletePost}`) 
                      existingPostsCopy.posts.push(post);
                })
                return existingPostsCopy;
            }
        }
      })
    }
  });

  const deleteHandler = async(postId: number) => {
      await deletePost({
        variables: {
          deletePostId: postId
        }
      })
  }

  const {data: getPostsData, loading: getPostsLoading, error: getPostsError, fetchMore: fetchMorePosts } = useQuery(GetAllPostsDocument, {
    variables: {
      options: {
        skip: skip.current,
        limit: limit.current
      }
    },
    onCompleted: (data) => {
      if(skip.current == 0) skip.current += limit.current
    }
  });
 
  // useEffect init run - triggered on getPostsData change
  // on data retrieval, setSkip run - triggers re-render
  // useQuery hook run again with next skip - data changes - useEffect run which updates skip
  // triggers re-render and keeps going..
  // so use 'useRef' hook to prevent re-rendering of value that persists across renders

  checkIsAuth();
  
  return (
    <Layout>    
    { !getPostsData?.getAllPosts.posts ? (
      <p>Loading</p>
    ): (
      <>
      <ul>
        {getPostsData?.getAllPosts.posts.map((post) => {    
              return (
                <Card key={post.id} my={3}>
                  <Flex flex={1}>
                    <Box flex={1}>
                      <Vote post={post}></Vote>
                    </Box>
                    <Box flex={7} m={2} onClick={() => {
                      router.push(`/post/${post.id}`);
                    }} cursor={"pointer"}>
                      <CardHeader as='b'>{post.title}</CardHeader>
                      <CardBody>
                        <Text fontSize="sm">Posted by {post.author.username}</Text>
                        <br></br>
                        <Text>{post.textSlice}...</Text>
                      </CardBody>
                    </Box>
                    <Box flex={2} my={4} p={4}>
                      <IconButton aria-label="delete post" 
                                  icon={<DeleteIcon />}
                                  onClick={() => deleteHandler(post.id)}></IconButton>
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

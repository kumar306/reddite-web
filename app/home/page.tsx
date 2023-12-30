// home/page.tsx
'use client';

import Link from "next/link";
import { GetAllPostsDocument, IsLoggedInDocument } from "../__generated__/graphql";
import Layout from "../shared/layout";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";

interface HomeProps { }

const Home:React.FC<HomeProps> = ({}) => {

  // apollo query goes from next js server directly (SERVER COMPONENT) instead of reaching browser and then browser making a graphql request
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [postsNum, setPostsNum] = useState(0);

  const {data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError} = useQuery(IsLoggedInDocument);
  const {data: getPostsData, loading: getPostsLoading, error: getPostsError } = useQuery(GetAllPostsDocument, {
    variables: {
      options: {
        skip,
        limit
      }
    },
    onCompleted: (getPostsData) => {
        setPostsNum(getPostsData.getAllPosts.length);
    }
  });

 
  const nextPage = () => {
    setSkip(skip+5);
  }

  const prevPage = () => {
    setSkip(skip-5);
  }
  
  console.log(getPostsData?.getAllPosts)

  return (
    <Layout>
      <Link href="/create-post">Create Post</Link>
      <hr></hr>
      <br></br>
    { !getPostsData?.getAllPosts ? (
      <p>Loading</p>
    ): (
      <>
      <ul>
        {getPostsData?.getAllPosts.map((post,id) => {
          console.log(post);
          console.log(id);
          id+=1;
          if(id<limit) {
              id++;
              return (
              <li key={post.id}>
                {post.title}
                <br></br>
                <p>{post.text}</p>
              </li> 
              ) 
          }
          else return null;
          }
        )}
      </ul>
      <br></br>
      { postsNum == limit ? (
           <Box py={4}>
           <Button onClick={nextPage}>Next Page</Button>
         </Box>
      ) : <Box py={4}>
          <Button onClick={prevPage}>Previous Page</Button>
        </Box>}
      </>
    )}
    </Layout>
  )
}

export default Home;

// home/page.tsx
import { Navbar } from "../shared/navbar";
import { GetAllPostsDocument, IsLoggedInDocument, LogoutDocument } from "../__generated__/graphql";
import { getClient } from "../lib/apollo-client";
import { request } from "http";
import {cookies, headers} from 'next/headers';
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default async function Page() {

  // apollo query goes from next js server directly (SERVER COMPONENT) instead of reaching browser and then browser making a graphql request
  
  const loggedInUser = await getClient().query({
    query: IsLoggedInDocument
  })

  const postsData = await getClient().query({
    query: GetAllPostsDocument,  
  });
  
  console.log(postsData.data);
  console.log(loggedInUser.data);

  return (
    <>
    <Navbar loggedInUser={loggedInUser}></Navbar>
    { !postsData.data ? (
      <p>Loading</p>
    ): (
      <ul>
        {postsData.data.getAllPosts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    )}
    </>
  )
}

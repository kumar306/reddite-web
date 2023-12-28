// home/page.tsx
import Link from "next/link";
import { GetAllPostsDocument, IsLoggedInDocument } from "../__generated__/graphql";
import { getClient } from "../lib/apollo-client";
import Layout from "../shared/layout";

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
    <Layout>
      <Link href="/create-post">Create Post</Link>
      <br></br>
    { !postsData.data ? (
      <p>Loading</p>
    ): (
      <ul>
        {postsData.data.getAllPosts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    )}
    </Layout>
  )
}

// lib/client.js
import { HttpLink, from } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { headers } from "next/headers";

const userMiddleware = setContext((request, previousContext) => ({
headers: {
      cookie: headers().get('cookie')
    }
}))

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: from([userMiddleware, httpLink])
    });
  });

"use client";

import { ApolloLink, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { NextSSRInMemoryCache,
ApolloNextAppProvider,
NextSSRApolloClient,
SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";
import { useRouter } from "next/navigation";
import { createFragmentRegistry } from "@apollo/client/cache";
import { PostFieldsFragmentDoc, UserFieldsFragmentDoc } from "../__generated__/graphql";

export interface ProviderProps {}

const makeClient = ():NextSSRApolloClient<NormalizedCacheObject> => {

    const router = useRouter();
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `Message: ${message}`
            )
          ); //error will get thrown if user not authenticated when creating a post
          router.push('/login');
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    // for handling Errors raised by resolver - we include errorLink - a middleware for errorhandling
    // apollo hits middleware functions in chain for each request
    // first we include errorLink to print error messages and then httplink to return the response

      
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                getAllPosts: {
                  keyArgs: false,
                  merge(existing = { __typename: "PostsOutput", posts: [], hasMore: true}, incoming) {
                    // this fn is called when writing data into cache - we are modifying the default write behaviour
                    // when query called with diff args, apollo cache stores in diff loc, doesnt overwrite
                    // so by calling merge, we are combining all paginated results into one big result in cache
                    
                    // object returned by merge should be of same type returned by graphql query

                    return { 
                        __typename: "PostsOutput",
                        posts: [...existing.posts, ...incoming.posts],
                        hasMore: incoming.hasMore
                    }
                  }
                }
              }
            }
          },
          fragments: createFragmentRegistry(PostFieldsFragmentDoc, UserFieldsFragmentDoc)
        }),
        link: 
            typeof window === "undefined" ? 
            ApolloLink.from([
                errorLink,
                new SSRMultipartLink({
                  stripDefer: true,
                }),
                httpLink,
              ]) :
            ApolloLink.from([errorLink, httpLink])}
    )
}

export function ApolloProvider({children}:React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}   

//ssr multipart link - helps in performance - ssr data fetching and caching
// this is for all client component queries and mutations in general - when doing useMutation, useQuery
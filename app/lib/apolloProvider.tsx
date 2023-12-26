"use client";

import { ApolloLink, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { NextSSRInMemoryCache,
ApolloNextAppProvider,
NextSSRApolloClient,
SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import { PropsWithChildren } from "react";

export interface ProviderProps {}

const makeClient = ():NextSSRApolloClient<NormalizedCacheObject> => {
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
    });
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: 
            typeof window === "undefined" ? 
            ApolloLink.from([
                new SSRMultipartLink({
                  stripDefer: true,
                }),
                httpLink,
              ]):ApolloLink.from([httpLink])}
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
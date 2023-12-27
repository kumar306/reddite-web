'use client';

import { ApolloQueryResult, FetchResult, useMutation, useQuery } from "@apollo/client";
import { Alert, Box, Button, Flex, Text } from "@chakra-ui/react";
import { GetUserDetailsDocument, IsLoggedInDocument, IsLoggedInQuery, LogoutDocument, LogoutMutation } from "../__generated__/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";

// if user logged in, username should show in top right with logout button
// else if user not logged in, login and register buttons should show in top right
// check if user logged in by using getUserDetails query - checks for userId in session coming from cookie and queries user table with that id

interface NavbarProps {
    loggedInUser: ApolloQueryResult<IsLoggedInQuery>
}
export const Navbar:React.FC<NavbarProps> = ({ loggedInUser }) => {

    const { data, loading, error } = useQuery(IsLoggedInDocument); //query if user logged in
    const [logout] = useMutation(LogoutDocument);
    const router = useRouter();
    const handleLogout = async() => {
        const logoutResponse = await logout({
            refetchQueries: [IsLoggedInDocument]
        });  
        router.push('/home');
    }

    return (
        <>
        {data && (
             <Flex bg="tomato" color={"white"} p={4}>
             <Box>
                 <Text fontSize='lg'>REDDITE</Text>
             </Box>
             <Box ml="auto">
                 { data?.isLoggedIn.user ? 
                 (
                     <Flex>     
                         <Text fontSize='md' mr={4}>Hello {data.isLoggedIn.user.username}</Text>
                         <Button size='md' color={'white'} bg={'red'} variant='ghost' onClick={handleLogout}>Logout</Button>
                     </Flex>) : 
                 (
                     <Flex>
                         <Box mr={2}>
                             <Link href={'/login'}>Login</Link>
                         </Box>
                         <Box>
                             <Link href={'/register'}>Register</Link>
                          </Box>
                     </Flex>
                 )}
             </Box>
         </Flex>
        )}
       
        </>
    )
}

// div follows flex of parent container by default - if another box is created
// ssr query was done with getClient().query()
// results came in nextjs server
// cache not getting updated when using useMutation, refetch queries

// but if init query done with useQuery client side, then cache got updated after useMutation refetch queries
// this is because i am creating a new client with separate cache with each SSR req
// but for useQuery - i am having a single client with single cache
// so for each SSR req we do, run useQuery for that as well - so cache gets updated
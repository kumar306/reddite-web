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

    // const { data, loading, error } = useQuery(IsLoggedInDocument); //query if user logged in
    const [logout] = useMutation(LogoutDocument);
    const router = useRouter();
    const handleLogout = async() => {
        const logoutResponse = await logout({
            refetchQueries: [IsLoggedInDocument]
        });  
        console.log(logoutResponse.data?.logout);
        router.push('/home');
    }

    return (
        <>
        <Flex bg="tomato" color={"white"} p={4}>
            <Box>
                <Text fontSize='lg'>REDDITE</Text>
            </Box>
            <Box ml="auto">
                { loggedInUser.data?.isLoggedIn.user ? 
                (
                    <Flex>     
                        <Text fontSize='md' mr={4}>Hello {loggedInUser.data.isLoggedIn.user.username}</Text>
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
        </>
    )
}

// div follows flex of parent container by default - if another box is created
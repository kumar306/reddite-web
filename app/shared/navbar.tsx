'use client';

import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { GetUserDetailsDocument, IsLoggedInDocument } from "../__generated__/graphql";
import Link from "next/link";

// if user logged in, username should show in top right with logout button
// else if user not logged in, login and register buttons should show in top right
// check if user logged in by using getUserDetails query - checks for userId in session coming from cookie and queries user table with that id

interface NavbarProps {}
export const Navbar:React.FC<NavbarProps> = ({}) => {

    const { data, loading, error } = useQuery(IsLoggedInDocument); //query if user logged in
    console.log(data);
    return (
        <>
        {data !== undefined ? (
        <Flex bg="tomato" color={"white"} p={4}>
            <Box>
                <Text fontSize='lg'>REDDITE</Text>
            </Box>
            <Box ml="auto">
                { data?.isLoggedIn.user ? 
                (
                    <Flex>     
                        <Text fontSize='md' mr={4}>Hello {data.isLoggedIn.user.username}</Text>
                        <Link href={'/logout'}>Logout</Link>
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
        ): null}
        </>
    )
}

// div follows flex of parent container by default - if another box is created
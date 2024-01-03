'use client';

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { Post, PostFieldsFragment, VoteDocument } from "../__generated__/graphql"
import { useMutation } from "@apollo/client"
import { useState } from "react";

interface VoteProps {
    // post: Omit<Post,"text">
    post: PostFieldsFragment
}

export const Vote:React.FC<VoteProps> = ({post}) => {
    const [loading, setLoading] = 
        useState<'upvoteLoading' | 'downvoteLoading' | 'notLoading'>('notLoading');
    const [vote] = useMutation(VoteDocument);

    const upvote = async() => {
        // vote mutation should run with postId - take it from props, value should be +1

        setLoading('upvoteLoading');
        await vote({
            variables: {
                input: {
                    postId: post.id,
                    vote: 1
                }
            }
        });
        setLoading('notLoading');

    }

    const downvote = async() => {
        // vote mutation should run with postId - take it from props, value should be -1
        setLoading('downvoteLoading');
        await vote({
            variables: {
                input: {
                    postId: post.id,
                    vote: -1
                }
            }
        });
        setLoading('notLoading');
    }

    return (
        // two icon buttons 
        <Flex direction={"column"} m={3} alignContent={"space-evenly"}>
            <IconButton isLoading={loading == 'upvoteLoading' ? true : false}  aria-label="upvote" icon={<ChevronUpIcon />} onClick={upvote}></IconButton>
            <Text textAlign="center">{post.points}</Text>
            <IconButton isLoading={loading == 'downvoteLoading' ? true : false} aria-label="downvote" icon={<ChevronDownIcon />} onClick={downvote}></IconButton>
        </Flex>
    )
}
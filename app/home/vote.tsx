'use client';

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { PostFieldsFragment, PostFieldsFragmentDoc, VoteDocument } from "../__generated__/graphql"
import { useMutation } from "@apollo/client"
import { useState } from "react";

interface VoteProps {
    // post: Omit<Post,"text">
    post: PostFieldsFragment
}

export const Vote:React.FC<VoteProps> = ({post}) => {
    const [loading, setLoading] = 
        useState<'upvoteLoading' | 'downvoteLoading' | 'notLoading'>('notLoading');

    const [vote] = useMutation(VoteDocument, {
        update(cache, {data}) {
            cache.modify({
                fields: {
                    getAllPosts(existingPosts = [], { readField }) {
                        const updatedPostRef = cache.writeFragment({
                            data: data?.vote,
                            fragment: PostFieldsFragmentDoc,
                            fragmentName: "PostFields" 
                            //give fragment name when more than 1 fragment is involved in the cache update
                        })
                        return existingPosts;
                    }
                }
            })
        }
    });

    const upvote = async() => {
        // vote mutation should run with postId - take it from props, value should be +1    

        // after doing a vote - vote mutation should return me the updated post with updated points
        // this post's cache id will be retrieved and PostFieldsFragment will be written in update callback

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
            },
        });
        setLoading('notLoading');
    }

    return (
        // two icon buttons 
        <Flex direction={"column"} m={3} alignContent={"space-evenly"}>
            <IconButton 
                isLoading={loading == 'upvoteLoading' ? true : false}  
                aria-label="upvote" icon={<ChevronUpIcon />} 
                colorScheme={post.voteStatus == 1 ? "green" : "gray"}
                onClick={upvote}>
            </IconButton>
            <Text textAlign="center">{post.points}</Text>
            <IconButton 
                isLoading={loading == 'downvoteLoading' ? true : false} 
                aria-label="downvote" icon={<ChevronDownIcon />} 
                colorScheme={post.voteStatus == -1 ? "red" : "gray"}
                onClick={downvote}>
            </IconButton>
        </Flex>
    )
}
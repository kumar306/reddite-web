/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment FieldErrors on FieldError {\n  field\n  message\n}": types.FieldErrorsFragmentDoc,
    "fragment PostFields on Post {\n  id\n  title\n  author {\n    ...UserFields\n  }\n  points\n  createdAt\n  updatedAt\n  textSlice\n  voteStatus\n}": types.PostFieldsFragmentDoc,
    "fragment UserFields on User {\n  id\n  username\n  email\n  fname\n  lname\n  createdAt\n  updatedAt\n}": types.UserFieldsFragmentDoc,
    "mutation ChangePassword($options: PasswordResetInput!) {\n  changePassword(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    text\n    author {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n    points\n    createdAt\n    updatedAt\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($deletePostId: Float!) {\n  deletePost(deletePostId: $deletePostId)\n}": types.DeletePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($options: LoginInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: RegisterInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}": types.RegisterDocument,
    "mutation UpdatePost($input: UpdatePostInput!) {\n  updatePost(input: $input) {\n    ...PostFields\n  }\n}": types.UpdatePostDocument,
    "mutation Vote($input: VoteInput!) {\n  vote(input: $input) {\n    ...PostFields\n  }\n}": types.VoteDocument,
    "query GetAllPosts($options: PaginationInput!) {\n  getAllPosts(options: $options) {\n    posts {\n      ...PostFields\n    }\n    hasMore\n  }\n}": types.GetAllPostsDocument,
    "query GetPost($getPostId: Float!) {\n  getPost(getPostId: $getPostId) {\n    ...PostFields\n    text\n  }\n}": types.GetPostDocument,
    "query getUserDetails($username: String!) {\n  getUserDetails(username: $username) {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}": types.GetUserDetailsDocument,
    "query isLoggedIn {\n  isLoggedIn {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}": types.IsLoggedInDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment FieldErrors on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment FieldErrors on FieldError {\n  field\n  message\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PostFields on Post {\n  id\n  title\n  author {\n    ...UserFields\n  }\n  points\n  createdAt\n  updatedAt\n  textSlice\n  voteStatus\n}"): (typeof documents)["fragment PostFields on Post {\n  id\n  title\n  author {\n    ...UserFields\n  }\n  points\n  createdAt\n  updatedAt\n  textSlice\n  voteStatus\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserFields on User {\n  id\n  username\n  email\n  fname\n  lname\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment UserFields on User {\n  id\n  username\n  email\n  fname\n  lname\n  createdAt\n  updatedAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ChangePassword($options: PasswordResetInput!) {\n  changePassword(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($options: PasswordResetInput!) {\n  changePassword(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    text\n    author {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n    points\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n    text\n    author {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n    points\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeletePost($deletePostId: Float!) {\n  deletePost(deletePostId: $deletePostId)\n}"): (typeof documents)["mutation DeletePost($deletePostId: Float!) {\n  deletePost(deletePostId: $deletePostId)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Login($options: LoginInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation Login($options: LoginInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Register($options: RegisterInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation Register($options: RegisterInput!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      username\n      email\n      fname\n      lname\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdatePost($input: UpdatePostInput!) {\n  updatePost(input: $input) {\n    ...PostFields\n  }\n}"): (typeof documents)["mutation UpdatePost($input: UpdatePostInput!) {\n  updatePost(input: $input) {\n    ...PostFields\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Vote($input: VoteInput!) {\n  vote(input: $input) {\n    ...PostFields\n  }\n}"): (typeof documents)["mutation Vote($input: VoteInput!) {\n  vote(input: $input) {\n    ...PostFields\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllPosts($options: PaginationInput!) {\n  getAllPosts(options: $options) {\n    posts {\n      ...PostFields\n    }\n    hasMore\n  }\n}"): (typeof documents)["query GetAllPosts($options: PaginationInput!) {\n  getAllPosts(options: $options) {\n    posts {\n      ...PostFields\n    }\n    hasMore\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPost($getPostId: Float!) {\n  getPost(getPostId: $getPostId) {\n    ...PostFields\n    text\n  }\n}"): (typeof documents)["query GetPost($getPostId: Float!) {\n  getPost(getPostId: $getPostId) {\n    ...PostFields\n    text\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getUserDetails($username: String!) {\n  getUserDetails(username: $username) {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}"): (typeof documents)["query getUserDetails($username: String!) {\n  getUserDetails(username: $username) {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query isLoggedIn {\n  isLoggedIn {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}"): (typeof documents)["query isLoggedIn {\n  isLoggedIn {\n    errors {\n      ...FieldErrors\n    }\n    user {\n      ...UserFields\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
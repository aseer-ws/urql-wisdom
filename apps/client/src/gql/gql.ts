/* eslint-disable */
import * as types from './graphql';
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
    "\n  query Me {\n    me {\n      name\n    }\n  }\n": types.MeDocument,
    "\n  query Messages($params: PaginationParams!) {\n    messages(params: $params) {\n      _id\n      name\n      text\n      createdAt\n      updatedAt\n    }\n  }\n": types.MessagesDocument,
    "\n  mutation Login($name: String!) {\n    login(name: $name) {\n      name\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation AddMessage($text: String!) {\n    addMessage(text: $text) {\n      name\n      text\n      _id\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddMessageDocument,
    "\n  subscription NewMesssage {\n    newMessage {\n      _id\n      createdAt\n      name\n      text\n      updatedAt\n    }\n  }\n": types.NewMesssageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      name\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Messages($params: PaginationParams!) {\n    messages(params: $params) {\n      _id\n      name\n      text\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Messages($params: PaginationParams!) {\n    messages(params: $params) {\n      _id\n      name\n      text\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($name: String!) {\n    login(name: $name) {\n      name\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($name: String!) {\n    login(name: $name) {\n      name\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMessage($text: String!) {\n    addMessage(text: $text) {\n      name\n      text\n      _id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddMessage($text: String!) {\n    addMessage(text: $text) {\n      name\n      text\n      _id\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewMesssage {\n    newMessage {\n      _id\n      createdAt\n      name\n      text\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription NewMesssage {\n    newMessage {\n      _id\n      createdAt\n      name\n      text\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
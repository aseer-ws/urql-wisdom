import { graphql } from "../gql";

export const meQueryDocument = graphql(/* GraphQL */ `
  query Me {
    me {
      name
    }
  }
`);

export const messagesQueryDocument = graphql(/* GraphQL */ `
  query Messages($params: PaginationParams!) {
    messages(params: $params) {
      _id
      name
      text
      createdAt
      updatedAt
    }
  }
`);

export const loginMutationDocument = graphql(/* GraphQL */ `
  mutation Login($name: String!) {
    login(name: $name) {
      name
      token
    }
  }
`);

export const addMessageMutationDocument = graphql(/* GraphQL */ `
  mutation AddMessage($text: String!) {
    addMessage(text: $text) {
      name
      text
      _id
      createdAt
      updatedAt
    }
  }
`);

export const newMessageSubscriptionDocument = graphql(/* GraphQL */ `
  subscription NewMesssage {
    newMessage {
      _id
      createdAt
      name
      text
      updatedAt
    }
  }
`);

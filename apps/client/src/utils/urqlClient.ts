import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient as createWSClient } from "graphql-ws";
import { createClient, fetchExchange, subscriptionExchange } from "urql";
import { NewMesssageSubscription } from "../gql/graphql";
import { messagesQueryDocument } from "../schema";
import useBaseStore from "../store";

const wsClient = createWSClient({
  url: "ws://localhost:1234/graphql",
});

export const urqlClient = createClient({
  url: "http://localhost:1234/graphql",
  exchanges: [
    devtoolsExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_, __, cache) => {
            cache.invalidate("Query", "me");
          },
        },
        Subscription: {
          newMessage: (result: NewMesssageSubscription, _, cache) => {
            cache.updateQuery(
              {
                query: messagesQueryDocument,
                variables: { params: { offset: 0, limit: 5 } },
              },
              (data) => {
                data?.messages.unshift(result.newMessage);
                return data;
              }
            );
          },
        },
      },
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || "" };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
  fetchOptions: () => {
    const token = useBaseStore.getState().token;
    return { headers: { authorization: token ? `Bearer ${token}` : "" } };
  },
  requestPolicy: "cache-first",
});

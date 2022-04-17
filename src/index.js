import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  split,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// For development, uri: http://localhost:5000/graphql
// For deploy, uri: https://powerful-temple-86759.herokuapp.com/graphql
const httpLink = createHttpLink({
  uri: "https://powerful-temple-86759.herokuapp.com/graphql",
});

// For development, uri: ws://localhost:5000/graphql
// For deploy, uri: wss://powerful-temple-86759.herokuapp.com/graphql
const wsLink = new WebSocketLink({
  uri: "wss://powerful-temple-86759.herokuapp.com/graphql",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

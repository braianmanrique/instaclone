import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client"; 
import { createUploadLink } from "apollo-upload-client";


const httpLink = createUploadLink({
    uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
    connectToDevTools : true,
    cache : new InMemoryCache,
    link: httpLink
});

export default client;
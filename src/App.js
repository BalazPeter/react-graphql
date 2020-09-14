import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import BookList from "./componensts/BookList";


//Apollo Client Setup
const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
})

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>Hello World</h1>
                <BookList/>
            </div>
        </ApolloProvider>
    );
}

export default App;

import React from 'react';
import {  ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloClient } from 'apollo-client'

import LandingPages from './pages/LandingPages';
import NavBar from './components/NavBar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <NavBar /> {/* Include the NavBar component */}
          <div className="container">
            <Route path="/" element={<LandingPages />} />
            <Route path="/signup" element={<LandingPages />} />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

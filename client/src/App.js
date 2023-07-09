import React from 'react';
// MW - Import ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
// MW - Import setContext
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// TODO: Import pages here
import Navbar from './components/NavBar';
import LoginPage from './pages/Login';

// MW - Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// MW - Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // MW - get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // MW - return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // MW - Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/login' element={<LoginPage/>}> 
            </Route>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

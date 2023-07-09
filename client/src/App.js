import React from 'react';
import {  ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// TODO: Import pages here
import Navbar from './components/NavBar';
import LandingPages from './pages/LandingPages';
import LoginPage from './pages/Login';

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
          {/* <Navbar /> */}
          <Routes>
            <Route path='/login' element={<LoginPage/>}> 
            </Route>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

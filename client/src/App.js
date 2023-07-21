import React, { useState, useEffect, useRef } from 'react';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache, 
  createHttpLink, 
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './utils/auth';
import DashBoard from './pages/DashboardPage';
import DetailsPage from './pages/DetailsPage';
import JourneyPage from './pages/JourneyPage';
import LandingPage from './pages/LandingPage';
import './App.css';
import { Provider } from './utils/context';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// import Profile from './pages/Profile';
// MW - Construct our main GraphQL API endpoint
const httpLink = createHttpLink({ 
  uri: '/graphql' 
});

const authLink = setContext((_, { headers }) => {
  const token = AuthService.getTokenFromStorage();
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

// const getTokenFromStorage = () => {
//   return localStorage.getItem('id_token');
// };

// const isAuthenticated = () => {
//   const token = getTokenFromStorage();
//   if (!token) return false;
//   try {
//     const { exp } = jwtDecode(token);
//     // Check if token is expired
//     const tokenExpired = Date.now() >= exp * 1000;
//     if (tokenExpired) {
//       console.log('Token has expired.');
//       localStorage.removeItem('id_token');
//       return false;
//     } else {
//       return true;
//     }
//   } catch (err) {
//     console.log('Error in isAuthenticated(): ', err);
//     return false;
//   }
// };

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    setAuthenticated(AuthService.isAuthenticated());
  }, []);

  return authenticated;
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const RoutesComponent= () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();
  const wasAuthenticated = usePrevious(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && wasAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, wasAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/edit-journey/:id" element={<DetailsPage />} />

      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    )
  };
};

  function App() {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <Router>
            <RoutesComponent />
          </Router>
        </ApolloProvider>
      </Provider>
    );
  };

  export default App;

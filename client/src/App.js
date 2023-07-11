import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// MW - Import ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
// MW - Import setContext
import { setContext } from '@apollo/client/link/context';
import jwtDecode from 'jwt-decode';
// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// TODO: Import pages here
// import Navbar from './components/NavBar';
import DashBoard from './pages/DashboardPage';
import DetailsPage from './pages/DetailsPage';
import JourneyPage from './pages/JourneyPage';
import LandingPage from './pages/LandingPage';
// import Profile from './pages/Profile';
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

const isAuthenticated = () => {
  const token = localStorage.getItem('id_token');
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    // Check if token is expired
    if (Date.now() >= exp * 1000) {
      console.log('Token has expired.');
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log('Error in isAuthenticated(): ', err);
    return false;
  }
};

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('id_token'));

  // useEffect(() => {
  //   setIsAuthenticated(!!localStorage.getItem('id_token'));
  // }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard" 
            element={isAuthenticated ? <DashBoard /> : <Navigate to="/dashboard" />}
          />
          <Route path="/journey" element={isAuthenticated ? <JourneyPage /> : <Navigate to="/" />} />
          <Route path="/details/:journeyId" element={isAuthenticated ? <DetailsPage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" /> } />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <>
//           {/* <Navbar /> */}
//           <Routes>
//             <Route
//               path='/'
//               element={<LandingPage />}
//             />
//             <Route
//               path='/dashboard'
//               element={<DashBoard />}
//             />
//             <Route
//               path='/journey'
//               element={<JourneyPage />}
//             />
//             <Route
//               path='/details/:journeyId'
//               element={<DetailsPage />}
//             />
//             <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
//           </Routes>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
// }

export default App;

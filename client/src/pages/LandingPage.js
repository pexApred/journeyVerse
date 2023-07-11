import React from 'react';
import AppNavbar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import './LandingPage.css'; 
import Footer from '../components/Footer';
import Signup from '../components/SignupForm';

const LandingPage = () => {
  return (
    <>
    <div>
      <AppNavbar />
    </div>
   <div className="landing-page">
        <Container className='custom-container'>
          <h1 className="display-4 text-center">JourneyVerse</h1>
          <p className="lead text-center">Collaborate travel plans through JourneyVerse: an app which facilitates logistics on upcoming trips, travel companions, and journaling.
          </p>
        </Container>
    </div>
    {/* WE NEED TO MAKE THE SIGN UP DIV SHOW CONDITIONALLY: Logged-in/logged out */}
    <div className="signup">
      <Container>
        <Signup />
    </Container>
    </div>
    <Footer />
    </>
  );
};

export default LandingPage;

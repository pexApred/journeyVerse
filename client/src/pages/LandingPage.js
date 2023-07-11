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
    <Container className='custom-container d-flex flex-column align-items-center'>
        <div className="landing-page">
    <div>
       <h1 className="display-4 text-center">JourneyVerse</h1>
        <p className="lead text-center">Collaborate travel plans through JourneyVerse: an app which facilitates logistics on upcoming trips, travel companions, and journaling.
        </p>
          </div>
    </div>
    {/* WE NEED TO MAKE THE SIGN UP DIV SHOW CONDITIONALLY: Logged-in/logged out */}
    <div className="signup">
    <Signup />
    </div>
    </Container>
    <Footer />
    </>
  );
};

export default LandingPage;

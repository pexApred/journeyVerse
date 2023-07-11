import React from 'react';
import AppNavbar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import "../css/LandingPage.css"

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
    </Container>
    <Footer />
    </>
  );
};

export default LandingPage;

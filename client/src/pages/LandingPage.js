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
      <Container style={{ maxWidth: '600px' }}>
        <div className="landing-page custom-container d-flex flex-column align-items-center">
          <div>
            <h1 className="display-4 text-center">JourneyVerse</h1>
            <h4 className="text-center">Collaborate travel plans through JourneyVerse: an app which facilitates logistics on upcoming trip details and travel companions.
            </h4>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;

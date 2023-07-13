import React, { useState, useEffect } from 'react';
import JourneyList from '../components/JourneyList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/DashboardPage.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const DashboardPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const email = 'user@example.com';
  const [currentJourney, setCurrentJourney] = useState(null);
  const [journeyHistory, setJourneyHistory] = useState([]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Simulate fetching current journey from an API
    setCurrentJourney({

    });


  }, [],
  );

  return (
    <div>
      {/* Header */}
      <NavBar />
      <div className="landing-page" style={{
        backgroundImage: `url('../background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
      }}>
      <Container className="justify-content-center">
        {/* Profile Widget */}
        <div>
          <h1>JourneyVerse Dashboard</h1>
        </div>
        <Row className='profile'>
          <Col sm={1}>
            {profilePicture ? (
              <img className="rounded-circle" style={{ width: '80px' }} src={profilePicture} alt="Profile" />
            ) : (
              <div>
                <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
              </div>
            )}
          </Col>
          <Col sm={11}>
            <div><h2>First Last</h2><h4>{email}</h4></div>
          </Col>
        </Row>

        {/* Create a journey link */}
        <Button className="button" as={Link} to="/journey" variant="primary">
          Create a Journey
        </Button>

        {/* Display the current in-progress journey */}
        {currentJourney && (
          <Card className="current" style={{ width: '60%' }}>
            <h2>Current Journey</h2>
            <p className="formlabel"> Destination: </p>
            <p>{currentJourney.destination}</p>
            <p className="formlabel"> Departing Date: </p>
            <p>{currentJourney.departingDate}</p>
          </Card>
        )}
        <JourneyList/>
      </Container>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;

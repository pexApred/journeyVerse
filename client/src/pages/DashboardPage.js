import React from 'react';
import JourneyList from '../components/JourneyList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; 
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DashboardPage = () => {
  // Sample data for demonstration purposes
  const profilePicture = 'path/to/profile-picture.jpg';
  const email = 'user@example.com';
  const currentJourney = {
    id: 1,
    destination: 'New York',
    departingDate: '2023-07-15',
  };
  const journeyHistory = [
    { id: 1, destination: 'Paris', departingDate: '2023-06-01' },
    { id: 2, destination: 'Tokyo', departingDate: '2023-05-15' },
    // ... more journeys
  ];

  return (
    <div>
      {/* Header */}
      <NavBar />
      <Container>
      {/* Profile Widget */}
      <Row className='profile'>
        <Col sm={1}>
         <div><img src={profilePicture} alt="Profile" roundedCircle/></div>
         </Col>
        <Col sm={11}>
        <div><h1>First Last</h1><h3>{email}</h3></div>
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
            <p>Destination: {currentJourney.destination}</p>
            <p>Departing Date: {currentJourney.departingDate}</p>
          </Card>
        )}

        {/* Display the journey list */}
        <Card className="history" style={{ width: '60%' }}>
        {journeyHistory && journeyHistory.length > 0 ? (
            <JourneyList journeys={journeyHistory} />
        ) : (
          <p>No journey history available.</p>
        )}
        </Card>
      </Container>
      {/* Journey History */}
      {/* ... implementation of journey history ... */}

      <Footer />
      </div>
  );
};

export default DashboardPage;

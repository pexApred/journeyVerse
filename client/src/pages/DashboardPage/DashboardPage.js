import React from 'react';
import JourneyList from '../../components/JourneyList/JourneyList.js';
import NavBar from '../../components/NavBar/NavBar.js';
import Footer from '../../components/Footer/Footer.js';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './DashboardPage.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Profile from '../../components/Profile/Profile.js';


const DashboardPage = () => {

  return (
    <div>
      {/* Header */}
      <NavBar />
      <div className="scrollable">
        <Container className="justify-content-center">
          {/* Profile Widget */}
          <div>
            <h1>JourneyVerse Dashboard</h1>
          </div>
          <Profile />
          {/* Create a journey link */}
          <Button className="button" as={Link} to="/journey" variant="primary">
            Create a Journey
          </Button>
          <JourneyList />
          {/* Display the current in-progress journey
          {currentJourney && (
            <Card className="current" style={{ width: '60%' }}>
              <h2>Current Journey</h2>
              <p className="formlabel"> Destination: </p>
              <p>{currentJourney.destination}</p>
              <p className="formlabel"> Departing Date: </p>
              <p>{currentJourney.departingDate}</p>
            </Card>
          )} */}
        </Container>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardPage;

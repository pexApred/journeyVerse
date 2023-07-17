import React, { useState, useEffect } from 'react';
import JourneyList from '../components/JourneyList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/DashboardPage.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';


const DashboardPage = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentJourney, setCurrentJourney] = useState(null);
  // const [journeyHistory, setJourneyHistory] = useState([]);
  // const location = useLocation();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 2097152; // 2MB

    if (file && file.size > maxSize) {
      alert('File is too large! Please select an image under 2MB.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.data.email);
      setFirstName(decodedToken.data.firstName);
      setLastName(decodedToken.data.lastName);
    }
  }, []);

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
              <div>
                <h2>{firstName} {lastName}</h2>
                <h4>{email}</h4>
              </div>
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
          <JourneyList />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;

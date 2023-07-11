import React, { useState, useEffect } from 'react';
import JourneyList from '../components/JourneyList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

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
      id: 1,
      destination: 'New York',
      departingDate: '2023-07-15',
    });

    // Simulate fetching journey history from an API
    setJourneyHistory([
      { id: 1, destination: 'Paris', departingDate: '2023-06-01' },
      { id: 2, destination: 'Tokyo', departingDate: '2023-05-15' },
      // ... more journeys
    ]);
  }, []);

  return (
    <div>
      {/* Header */}
      <NavBar />
      {/* Profile Widget */}
      <div>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" />
        ) : (
          <div>
            <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
            <p>{email}</p>
          </div>
        )}
      </div><br></br><br></br>

      <div>
        {/* Display the current in-progress journey */}
        {currentJourney && (
          <div>
            <h2>Current Journey</h2>
            <p>Destination: {currentJourney.destination}</p>
            <p>Departing Date: {currentJourney.departingDate}</p>
          </div>
        )}
      </div><br></br><br></br>
      <div>
        {/* Create a journey link */}
        <Button as={Link} to="/journey" variant="primary">
          Create a Journey
        </Button>
      </div><br></br><br></br>
      <div>
        {/* Display the journey list */}
        {journeyHistory && journeyHistory.length > 0 ? (
          <>
            <h2>Journey List</h2>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                Select a Journey
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {journeyHistory.map((journey) => (
                  <Dropdown.Item key={journey.id}>
                    <Link to={`/journey/${journey.id}`}>
                      {journey.destination}, {journey.departingDate}
                    </Link>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <p>No journey history available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;

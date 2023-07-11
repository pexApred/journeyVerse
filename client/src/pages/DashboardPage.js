import React from 'react';
import JourneyList from '../components/JourneyList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

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
      {/* Profile Widget */}
      <div>
        <img src={profilePicture} alt="Profile" />
        <p>{email}</p>
      </div>

      <div>
        {/* Create a journey link */}
        <Link to="/journey">Create a Journey</Link>
      </div>

      <div>
        {/* Display the current in-progress journey */}
        {currentJourney && (
          <div>
            <h2>Current Journey</h2>
            <p>Destination: {currentJourney.destination}</p>
            <p>Departing Date: {currentJourney.departingDate}</p>
          </div>
        )}

        {/* Display the journey list */}
        {journeyHistory && journeyHistory.length > 0 ? (
          <>
            <h2>Journey History</h2>
            <JourneyList journeys={journeyHistory} />
          </>
        ) : (
          <p>No journey history available.</p>
        )}
      </div>

      {/* Journey History */}
      {/* ... implementation of journey history ... */}

      <Footer />
    </div>
  );
};

export default DashboardPage;

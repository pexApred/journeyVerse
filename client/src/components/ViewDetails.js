import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './WeatherWidget';
import Countdown from './CountdownWidget';
import Map from './MapWidget';

const ViewDetails = ({ journey }) => {
  return (
    <div>
      <h2>Journey Details</h2>
      <p>Destination: {journey.destinationCity}, {journey.destinationState}, {journey.destinationCountry}</p>
      <p>Departing Date: {journey.departingDate}</p>
      {/* Display other journey details */}
      <Link to={`/journey/${journey.id}/edit`}>
        Edit
      </Link>

      {/* Display the Weather widget */}
      <Weather />

      {/* Display the Countdown widget */}
      <Countdown />

      {/* Display the Map widget */}
      <Map />
    </div>
  );
};

export default ViewDetails;


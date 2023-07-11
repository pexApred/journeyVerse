import React from 'react';

const ViewDetails = ({ journey }) => {
  return (
    <div>
      <h2>Journey Details</h2>
      <p>Destination: {journey.destination}</p>
      <p>Departing Date: {journey.departingDate}</p>
      {/* Display other journey details */}
    </div>
  );
};

export default ViewDetails;

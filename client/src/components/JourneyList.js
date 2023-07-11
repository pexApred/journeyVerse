import React from 'react';
import { Link } from 'react-router-dom';

{/* Display the journey list */}
const JourneyList = ({ journeys }) => {
  return (
    <div>
      <h2>Journey List</h2>
      {journeys.map((journey) => (
        <div key={journey.id}>{/* key is required for React to keep track of each item */}
          <Link to={`/journey/${journey.id}`}>{/* link to journey page */}
            {journey.destinationCity}, {journey.destinationState}, {journey.destinationCountry} - {journey.departingDate}{/* populate with journey info */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JourneyList;

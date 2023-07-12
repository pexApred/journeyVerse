import React from 'react';
import { Link } from 'react-router-dom';

const JourneyList = ({ journeys }) => {
  return (
    <div>

      {journeys.map((journey) => (
        <div key={journey.id}>

          {journey.destinationCity}, {journey.destinationState}, {journey.destinationCountry} - {journey.departingDate}{'   '} {/* this is the journey list */}
          <Link to={`/journey/${journey.id}`}>{/* this is the link to the journey details */}
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JourneyList;

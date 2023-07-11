import React, { useState, useEffect } from 'react';

const CountdownWidget = ({ departingDate }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    // Calculate remaining time based on the departing date
    const calculateRemainingTime = () => {
      const now = new Date();
      const departure = new Date(departingDate);
      const timeDiff = departure.getTime() - now.getTime();

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    };

    calculateRemainingTime();
  }, [departingDate]);

  return (
    <div>
      <h2>Countdown Widget</h2>
      {remainingTime ? (
        <div>
          <p>Days: {remainingTime.days}</p>
          <p>Hours: {remainingTime.hours}</p>
          <p>Minutes: {remainingTime.minutes}</p>
          <p>Seconds: {remainingTime.seconds}</p>
        </div>
      ) : (
        <p>Loading countdown...</p>
      )}
    </div>
  );
};

export default CountdownWidget;

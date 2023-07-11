import React, { useEffect, useState } from 'react';

const MapWidget = ({ destinationCity, destinationState, destinationCountry, onEditMap }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Function to handle successful geolocation retrieval
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    };

    // Function to handle geolocation retrieval error
    const handleError = (error) => {
      console.error('Error retrieving current location:', error);
    };

    // Get the current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const handleEditMap = () => {
    // Handle edit map functionality
    onEditMap();
  };

  return (
    <div>
      <h2>Map Widget</h2>
      {/* Display the current location and destination information */}
      {currentLocation && (
        <p>
          Current Location: {currentLocation.latitude}, {currentLocation.longitude}
        </p>
      )}
      <p>
        Destination: {destinationCity}, {destinationState}, {destinationCountry}
      </p>
      <button onClick={handleEditMap}>Edit Map</button>
    </div>
  );
};

export default MapWidget;


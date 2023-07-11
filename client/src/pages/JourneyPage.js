import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import JourneyForm from '../components/JourneyForm';
import WeatherWidget from '../components/WeatherWidget';
import MapWidget from '../components/MapWidget';
import CountdownWidget from '../components/CountdownWidget';

const JourneyPages = () => {
  const [journeyData, setJourneyData] = useState(null);

  return (
    <>
      <NavBar />
      <JourneyForm setJourneyData={setJourneyData} />
      {journeyData && (
        <>
          <WeatherWidget
            destinationCity={journeyData.destinationCity}
            destinationState={journeyData.destinationState}
            destinationCountry={journeyData.destinationCountry}
          />
          <MapWidget
            destinationCity={journeyData.destinationCity}
            destinationState={journeyData.destinationState}
            destinationCountry={journeyData.destinationCountry}
          />
          <CountdownWidget departingDate={journeyData.departingDate} />
        </>
      )}
      <Footer />
    </>
  );
};


export default JourneyPages;


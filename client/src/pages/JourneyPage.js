import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import JourneyForm from '../components/JourneyForm';
import WeatherWidget from '../components/WeatherWidget';
import MapWidget from '../components/MapWidget';
import CountdownWidget from '../components/CountdownWidget';
import { Container } from 'react-bootstrap';

const JourneyPages = () => {
  const [journeyData, setJourneyData] = useState(null);

  return (
    <>
      <NavBar />
      <Container>
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
      </Container>
      <Footer />
    </>
  );
};


export default JourneyPages;


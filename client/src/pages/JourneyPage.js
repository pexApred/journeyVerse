import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import JourneyForm from '../components/JourneyForm';
import WeatherWidget from '../components/WeatherWidget';
import MapWidget from '../components/MapWidget';
import CountdownWidget from '../components/CountdownWidget';
import { Container } from 'react-bootstrap';
import '../css/JourneyPage.css';

const JourneyPages = () => {
  const [journeyData, setJourneyData] = useState(null);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="landing-page" style={{
        backgroundImage: `url('../background.jpg')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'
      }}>
        <Container className='container'>
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
      </div>
      {/* <Footer /> */}
    </>
  );
};


export default JourneyPages;


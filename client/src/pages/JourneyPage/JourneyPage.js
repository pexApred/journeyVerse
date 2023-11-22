import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import JourneyForm from '../../components/JourneyForm/JourneyForm';
import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import MapWidget from '../../components/MapWidget/MapWidget';
import CountdownWidget from '../../components/CountdownWidget/CountdownWidget';
import { Container } from 'react-bootstrap';
import './JourneyPage.css';

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


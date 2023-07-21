import React, { useContext, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import { GET_JOURNEY } from '../utils/queries';
import { DELETE_JOURNEY } from '../utils/mutations';
import { Context } from '../utils/Context';
// import { format } from 'date-fns';
import '../css/JourneyList.css';
import { saveToLocalStorage, getFromLocalStorage, } from '../utils/localStorage';

const JourneyList = () => {
  const { loading, data, error, refetch } = useQuery(GET_JOURNEY);
  const [deleteJourney] = useMutation(DELETE_JOURNEY);
  const { journeys, setJourneys, deleteContextJourney } = useContext(Context);
  console.log('journeys: ', journeys, 'setJourneys: ', setJourneys, 'deleteContextJourney: ', deleteContextJourney);
  const navigate = useNavigate();

  const handleDeleteJourney = async (journeyId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteJourney({
        variables: { journeyId },
      });
      deleteContextJourney(journeyId);
      const storedJourneys = getFromLocalStorage('journeys') || [];
      const updatedJourneys = storedJourneys.filter((journey) => journey.id !== journeyId);
      saveToLocalStorage('journeys', updatedJourneys);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditJourney = (journeyId) => {
    navigate(`/edit-journey/${journeyId}`);
  };

  useEffect(() => {
    const storedJourneys = getFromLocalStorage('journeys');
    console.log('Stored Journeys',storedJourneys);
    if (storedJourneys) {
      setJourneys(storedJourneys);
    }
  }, [setJourneys]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setJourneys(data.journeys);
      saveToLocalStorage('journeys', data.journeys);
    } else if (error) {
      console.error(error);
    } else {
      refetch();
    }
  }, [data, setJourneys, refetch, error]);

  return (
    <>
      <Container>
        <h2 className="pt-5">
          {journeys?.length
            ? `Viewing ${journeys.length} saved ${journeys.length === 1 ? 'journey' : 'journeys'
            }:`
            : 'You have no saved journeys!'}
        </h2>
        <Row>
          {journeys?.map((journey) => (
            <Col md="4" key={journey.id}>
              <Card key={journey.id} border="dark">
                <Card.Body>
                  <Card.Title>{journey.destination}</Card.Title>
                  <p className="small">
                    Destination City: {journey.destinationCity}, {journey.destinationState},{' '}
                    {journey.destinationCountry}
                  </p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteJourney(journey.id)}
                  >
                    Delete this Journey!
                  </Button>
                  <button
                    className="btn-block btn-primary mt-2"
                    onClick={() => handleEditJourney(journey.id)}
                  >
                    Edit this Journey
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default JourneyList;

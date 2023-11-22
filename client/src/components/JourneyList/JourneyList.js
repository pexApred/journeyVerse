import React, { useContext, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';
import { GET_JOURNEYS } from '../../utils/queries';
import { DELETE_JOURNEY } from '../../utils/mutations';
import { Context } from '../../utils/Context';
import dateFormat from '../../utils/dateFormat';
import './JourneyList.css';
import { saveToLocalStorage, getFromLocalStorage, } from '../../utils/localStorage';

const JourneyList = () => {
  const { loading, data, error, refetch } = useQuery(GET_JOURNEYS);
  const [deleteJourney] = useMutation(DELETE_JOURNEY);
  const { journeys, setJourneys, deleteContextJourney, updateJourneys } = useContext(Context);
  // console.log('journeys: ', journeys, 'setJourneys: ', setJourneys, 'deleteContextJourney: ', deleteContextJourney);
  const navigate = useNavigate();

  const handleDeleteJourney = async (id) => {
    // console.log(`Deleting journey with id: ${id}`, id);

    const token = AuthService.loggedIn() ? AuthService.getTokenFromStorage() : null;
    // console.log('Deleting journey with id:', id);

    if (!token) {
      return false;
    }

    try {
      const response = await deleteJourney({
        variables: { id },
      });

      // console.log('RESPONSE', response);
      deleteContextJourney(id);
      const storedJourneyData = getFromLocalStorage('journeyData') || [];
      const updatedJourneyData = storedJourneyData.filter((journey) => journey.id !== id);
      saveToLocalStorage('journeyData', updatedJourneyData);
    } catch (err) {
      console.error(err);
    }
  };


  const handleEditJourney = (journeyId) => {
    navigate(`/edit-journey/${journeyId}`);
  };

  const sortedJourneys = journeys?.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
  const upcomingJourney = sortedJourneys?.[0];
  const otherJourneys = sortedJourneys?.slice(1);

  useEffect(() => {
    const storedJourneys = getFromLocalStorage('journeys');
    // console.log('Stored Journeys', storedJourneys);
    if (storedJourneys) {
      setJourneys(storedJourneys);
    }
  }, [setJourneys]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (loading) return;
    if (error) {
        console.error('ERROR WITH DATA', error);
        return;
    }
    if (data && data.journeys) {
        let sortedJourneys = [...data.journeys].sort((a, b) => new Date(a.departingDate) - new Date(b.departingDate));
        setJourneys(sortedJourneys);
        saveToLocalStorage('journeys', sortedJourneys);
    } else {
        setJourneys([]);
        saveToLocalStorage('journeys', []);
    }
}, [data, setJourneys, refetch, error, loading]);

if (loading) {
    return <h2>Loading...</h2>;
}

  return (
    <>
      <Container>
        <h2 className="pt-5">
          {journeys?.length
            ? `${journeys.length} Total ${journeys.length === 1 ? 'Journey' : 'Journeys'}:`
            : 'You have no saved journeys!'}
        </h2>
        <h3>
          {upcomingJourney
            ? `1 Upcoming`
            : 'No Upcoming Journey'}
        </h3>
        <Row>
          {upcomingJourney && (
            <>
              <Col md="4">
                <Card key={upcomingJourney.id} border="dark">
                  <Card.Body>
                    <Card.Title>{upcomingJourney.destination}</Card.Title>
                    <p className="small">
                      Destination: {upcomingJourney.destinationCity}, {upcomingJourney.destinationState},{' '}
                      {upcomingJourney.destinationCountry}
                    </p>
                    <p className="small">Departing Date: {upcomingJourney.departingDate}</p>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteJourney(upcomingJourney.id)}
                    >
                      Delete this Journey!
                    </Button>
                    <button
                      className="btn-block btn-primary mt-2"
                      onClick={() => handleEditJourney(upcomingJourney.id)}
                    >
                      Edit this Journey
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
        <h3>{otherJourneys?.length
          ? `${otherJourneys.length} Future ${otherJourneys?.length === 1 ? 'Journey' : 'Journeys'}` : 'You have no other journeys created.'} </h3>
        <Row>
          {otherJourneys?.map((journey) => (
            <Col md="4" key={journey.id}>
              <Card key={journey.id} border="dark">
                <Card.Body>
                  <Card.Title>{journey.destination}</Card.Title>
                  <p className="small">
                    Destination: {journey.destinationCity}, {journey.destinationState},{' '}
                    {journey.destinationCountry}
                  </p>
                  <p className="small">Departing Date: {journey.departingDate}</p>
                  {journey.invitedTravelers && journey.invitedTravelers.length > 0 && (
                    <p className="small">Invited Travelers:
                      {journey.invitedTravelers.map((traveler, index) => (
                        <span key={index}>
                          {traveler.firstName} {traveler.lastName}{index !== journey.invitedTravelers.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  )}


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

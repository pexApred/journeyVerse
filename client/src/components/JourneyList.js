import React, { useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import { GET_JOURNEY } from '../utils/queries';
import { DELETE_JOURNEY } from '../utils/mutations';
import { Context } from '../utils/context';
import { format } from 'date-fns';

const JourneyList = () => {
  const { loading, data, refetch } = useQuery(GET_JOURNEY);
  const [deleteJourney, { error }] = useMutation(DELETE_JOURNEY);
  const { journeys } = useContext(Context);
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
      refetch();
      // const { data } = await deleteJourney({
      //   variables: { journeyId },
      // });
      // upon success, refetch journey data
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditJourney = (journeyId) => {
    navigate(`/edit-journey/${journeyId}`);
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <h2 className="pt-5">
          {journeys?.length
            ? `Viewing ${journeys.length} saved ${
                journeys.length === 1 ? 'journey' : 'journeys'
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
                  {/* <Button */}
                    {/* // className="btn-block btn-danger"
                    // onClick={() => handleDeleteJourney(journey.id)} */}
                  {/* > */}
                    {/* Delete this Journey! */}
                  {/* </Button> */}
                  <Button
                    className="btn-block btn-primary mt-2"
                    onClick={() => handleEditJourney(journey.id)}
                  >
                    Edit this Journey
                  </Button>
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

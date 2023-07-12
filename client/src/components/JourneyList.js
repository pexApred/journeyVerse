import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_JOURNEY } from '../utils/queries';
import { DELETE_JOURNEY } from '../utils/mutations';

import { useContext } from 'react';
import { JourneyContext } from '../utils/JourneyContext';



const JourneyList = () => {
  const { loading, data, refetch } = useQuery(GET_JOURNEY);
  const [deleteJourney, { error }] = useMutation(DELETE_JOURNEY);
  const userData = data?.me || {};
  const { journeys } = useContext(JourneyContext);
  const handleDeleteJourney = async (journeyId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteJourney({
        variables: { journeyId },
      });
      // upon success, refetch journey data
      refetch()
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  journeys?.map((journey) => {
    return (
      <>
        <div fluid className="text-light bg-dark p-5">
          <Container>
            <h1>Viewing saved journeys!</h1>
          </Container>
        </div>
        <Container>
          <h2 className='pt-5'>
            {userData.JourneyList?.length
              ? `Viewing ${userData.JourneyList.length} saved ${userData.JourneyList.length === 1 ? 'journey' : 'journeys'}:`
              : 'You have no saved journeys!'}
          </h2>
          <Row>
            {userData.JourneyList?.map((journey) => {
              return (
                <Col md="4" key={journey.journey.id}>
                  <Card key={journey.journey.id} border='dark'>
                    <Card.Body>
                      <Card.Title>{journey.destination}</Card.Title>
                      <p className='small'>Departure Date: {journey.departingDate}</p>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteJourney(journey.journey.id)}>
                        Delete this Journey!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  });
};

export default JourneyList;

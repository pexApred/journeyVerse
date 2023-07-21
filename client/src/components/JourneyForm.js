import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../css/JourneyForm.css';
import { useMutation } from '@apollo/client';
import { CREATE_JOURNEY } from '../utils/mutations';
import { Context } from '../utils/context';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const JourneyForm = () => {
    const initialState = {
        id: '',
        destinationCity: '',
        destinationState: '',
        destinationCountry: '',
        departingDate: '',
        returningDate: '',
        transportationOutbound: '',
        transportationReturn: '',
        transportationDetails: '',
        accommodations: '',
        creator: '',
        inviteTravelers: [],
    };
    const [journeyData, setJourneyData] = useState(initialState);
    const { updateJourneys } = useContext(Context);
    const navigate = useNavigate();

    const [createJourney, { loading, error, data }] = useMutation(CREATE_JOURNEY);

    const handleInputChange = ({ target: { name, value } }) =>
        setJourneyData(prevData => ({ ...prevData, [name]: value }));


    const handleInviteTravelerInputChange = (index, name, { target: { value } }) => {
        const updatedInviteTravelers = [...journeyData.inviteTravelers];
        updatedInviteTravelers[index][name] = value;
        setJourneyData(prevData => ({ ...prevData, inviteTravelers: updatedInviteTravelers }));
    };

    const handleAddTraveler = () =>
        setJourneyData(prevData => ({
            ...prevData,
            inviteTravelers: [...prevData.inviteTravelers, { firstName: '', lastName: '', email: '' }]
        }));

    const handleRemoveTraveler = (index) => {
        const updatedInviteTravelers = [...journeyData.inviteTravelers];
        updatedInviteTravelers.splice(index, 1);
        setJourneyData(prevData => ({ ...prevData, inviteTravelers: updatedInviteTravelers }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!journeyData.creator) return alert('Please log in to create a journey!');
        if (Object.values(journeyData).some(([key, value]) => {
            if (key !== 'creator') {
                if (typeof value === 'string') {
                  return value === '';
                } else if (Array.isArray(value)) {
                  return value.some(traveler => Object.values(traveler).some(field => field === ''));
                }
              }
            })) return alert('Missing required fields!');
        
        const { id, inviteTravelers, ...otherJourneyData } = journeyData;
        console.log('Journey data:', otherJourneyData);
        const { data } = await createJourney({
            variables: {
                input: {
                    ...otherJourneyData,
                    invitedTravelers: inviteTravelers,
                },
            },
        });

        console.log('Journey data saved:', data.createJourney);
        updateJourneys(data.createJourney);
        localStorage.setItem('journeyData', JSON.stringify(otherJourneyData));
        setJourneyData(initialState);
        navigate('/dashboard');
    };

    useEffect(() => {
        const userData = AuthService.getProfile();
        console.log('UserData',userData);
      
        if (!userData || !userData.id) {
          console.log('User not logged in');
          return;
        }
      
        const userId = userData.id;
        console.log('User ID',userId);
        const savedJourneyData = localStorage.getItem('journeyData');
        let parsedData = {};
      
        if (savedJourneyData) {
          parsedData = JSON.parse(savedJourneyData);
        }
      
        setJourneyData({
          ...journeyData,
          ...parsedData,
          creator: userId
        });
      }, []);
      
    

    return (

        <Container className="journeyForm">
            <div>
                <div className="journeyForm-container">
                    <   h1 className="journeyForm-title mb-3">Start your Journey!</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <div>
                            <label className="formlabel" htmlFor="destinationCity">Destination City:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='City'
                                type="text"
                                name="destinationCity"
                                id="destinationCity"
                                value={journeyData.destinationCity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="destinationState">Destination State/Province/Region:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='State/Province/Region'
                                type="text"
                                name="destinationState"
                                id="destinationState"
                                value={journeyData.destinationState}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="destinationCountry">Destination Country:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='Country'
                                type="text"
                                name="destinationCountry"
                                id="destinationCountry"
                                value={journeyData.destinationCountry}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="departingDate">Departing:</label>
                            <input
                                className="form-input mb-3"
                                type="date"
                                name="departingDate"
                                id="departingDate"
                                value={journeyData.departingDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="returningDate">Returning:</label>
                            <input
                                className="form-input mb-3"
                                type="date"
                                name="returningDate"
                                id="returningDate"
                                value={journeyData.returningDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <label className="formlabel" htmlFor="transportationOutbound">Departing Mode of Transportation:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='ex. Flight, Train, etc.'
                                type="text"
                                name="transportationOutbound"
                                id="transportationOutbound"
                                value={journeyData.transportationOutbound}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="transportationReturn">Return Mode of Transportation:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='ex. Flight, Train, etc.'
                                type="text"
                                name="transportationReturn"
                                id="transportationReturn"
                                value={journeyData.transportationReturn}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="transportationDetails">Transportation Details:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='ex. Flight #, Train #, etc.'
                                type="text"
                                name="transportationDetails"
                                id="transportationDetails"
                                value={journeyData.transportationDetails}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="formlabel" htmlFor="accommodations">Accommodations:</label>
                            <input
                                className="form-input mb-3"
                                placeholder='ex. Hotel, Airbnb, etc.'
                                type="text"
                                name="accommodations"
                                id="accommodations"
                                value={journeyData.accommodations}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex">
                        <div>
                            <h3 className='invite' >Invite Travelers:</h3>
                            {journeyData.inviteTravelers.map((traveler, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col md={6}>
                                            <h4 className='traveler'>Traveler {index + 1}</h4>
                                            <div>
                                                <label htmlFor={`firstName-${index}`}>First Name:</label>
                                                <input
                                                    type="text"
                                                    name={`firstName`}
                                                    id={`firstName-${index}`}
                                                    value={traveler.firstName}
                                                    onChange={(event) => handleInviteTravelerInputChange(index, 'firstName', event)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`lastName-${index}`}>Last Name:</label>
                                                <input
                                                    type="text"
                                                    name={`lastName`}
                                                    id={`lastName-${index}`}
                                                    value={traveler.lastName}
                                                    onChange={(event) => handleInviteTravelerInputChange(index, 'lastName', event)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`email-${index}`}>Email:</label>
                                                <input
                                                    type="email"
                                                    name={`email`}
                                                    id={`email-${index}`}
                                                    value={traveler.email}
                                                    onChange={(event) => handleInviteTravelerInputChange(index, 'email', event)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button className='removet mb-3' type="button" variant="danger" onClick={() => handleRemoveTraveler(index)}>
                                        Remove Traveler
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" onClick={handleAddTraveler}>
                                Add Traveler
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="submit d-flex justify-content-center mb-3">
                        <Button style={{
                            fontSize: '1.5rem',
                        }}
                            type="submit" variant="warning">Submit</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}

export default JourneyForm;
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../css/JourneyForm.css';
import { useMutation } from '@apollo/client';
import { CREATE_JOURNEY } from '../utils/mutations';
import { Context } from '../utils/Context';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

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
    const [journeys, setjourneys] = useState(initialState);
    const { updateContextJourneys } = useContext(Context);
    const navigate = useNavigate();

    const [createJourney, { loading, error, data }] = useMutation(CREATE_JOURNEY);

    const handleInputChange = ({ target: { name, value } }) =>
        setjourneys(prevData => ({ ...prevData, [name]: value }));


    const handleInviteTravelerInputChange = (index, name, { target: { value } }) => {
        const updatedInviteTravelers = [...journeys.inviteTravelers];
        updatedInviteTravelers[index][name] = value;
        setjourneys(prevData => ({ ...prevData, inviteTravelers: updatedInviteTravelers }));
    };

    const handleAddTraveler = () => {
        if (journeys.inviteTravelers.length > 0) {
            const lastTraveler = journeys.inviteTravelers[journeys.inviteTravelers.length - 1];
            if (!lastTraveler.firstName || !lastTraveler.lastName || !lastTraveler.email) {
                return alert('Please fill out all fields for the current traveler!');
            }
        }

        setjourneys(prevData => ({
            ...prevData,
            inviteTravelers: [...prevData.inviteTravelers, { firstName: '', lastName: '', email: '' }]
        }));
    };

    const handleRemoveTraveler = (index) => {
        const updatedInviteTravelers = [...journeys.inviteTravelers];
        updatedInviteTravelers.splice(index, 1);
        setjourneys(prevData => ({ ...prevData, inviteTravelers: updatedInviteTravelers }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!journeys.creator) {
            return alert('Please log in to create a journey!');
        }

        for (const key in journeys) {
            if (key !== 'creator' && key !== 'id' && key !== 'inviteTravelers') {
                if (!journeys[key]) {
                    return alert(`Missing required field: ${key}`);
                }
            }
        }

        if (journeys.inviteTravelers.some(traveler => {
            return !traveler.firstName || !traveler.lastName || !traveler.email;
        })) {
            return alert('All fields for each traveler are required!');
        }

        const { id, inviteTravelers, ...otherjourneys } = journeys;

        // console.log('Journey data:', otherjourneys);

        try {
            const { data } = await createJourney({
                variables: {
                    input: {
                        ...otherjourneys,
                        invitedTravelers: inviteTravelers,
                    },
                },
            });

            const storedJourneys = getFromLocalStorage('journeys') || [];
            const updatedStoredJourneys = [...storedJourneys, data.createJourney];
            // console.log('Journey data saved:', data.createJourney);
            saveToLocalStorage('journeys', updatedStoredJourneys);
            updateContextJourneys(data.createJourney);
            setjourneys(initialState);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('There was an error creating your journey. Please try again.');
        }
    };


    useEffect(() => {
        const userData = AuthService.getProfile();
        // console.log('UserData', userData);

        if (!userData || !userData.id) {
            // console.log('User not logged in');
            return;
        }

        const userId = userData.id;
        // console.log('User ID', userId);
        const savedjourneys = getFromLocalStorage('journeys') || {};

        // Define a simple validation function to ensure essential keys are present
        const isValidJourneyData = (data) => {
            return data &&
                typeof data === 'object' &&
                data.hasOwnProperty('destinationCity') &&
                data.hasOwnProperty('destinationState') &&
                // ... you can add more keys to check if necessary
                data.hasOwnProperty('inviteTravelers') &&
                Array.isArray(data.inviteTravelers);
        };
        
        if (isValidJourneyData(savedjourneys)) {
            setjourneys(prevState => ({
                ...prevState,
                ...savedjourneys,
                creator: userId
            }));
        } else {
            console.warn("Saved journey data from local storage is not valid!");
            // Handle this scenario as required, for example:
            // - Use only the default state values
            // - Alert the user
            // - Clear the invalid data from local storage
        }
        
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
                                value={journeys.destinationCity}
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
                                value={journeys.destinationState}
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
                                value={journeys.destinationCountry}
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
                                value={journeys.departingDate}
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
                                value={journeys.returningDate}
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
                                value={journeys.transportationOutbound}
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
                                value={journeys.transportationReturn}
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
                                value={journeys.transportationDetails}
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
                                value={journeys.accommodations}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex">
                        <div>
                            <h3 className='invite' >Invite Travelers:</h3>
                            {journeys.inviteTravelers.map((traveler, index) => (
                                <div key={index} className='traveler-container'>
                                    <h4 className='traveler'>Traveler {index + 1}</h4>
                                    <Row className='traveler-row'>
                                        <Col md={4}>
                                            <label htmlFor={`firstName-${index}`}>First Name:</label>
                                            <input
                                                type="text"
                                                name={`firstName`}
                                                id={`firstName-${index}`}
                                                value={traveler.firstName}
                                                onChange={(event) => handleInviteTravelerInputChange(index, 'firstName', event)}
                                                className='traveler-input'
                                                placeholder='First Name'
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor={`lastName-${index}`}>Last Name:</label>
                                            <input
                                                type="text"
                                                name={`lastName`}
                                                id={`lastName-${index}`}
                                                value={traveler.lastName}
                                                onChange={(event) => handleInviteTravelerInputChange(index, 'lastName', event)}
                                                className='traveler-input'
                                                placeholder='Last Name'
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor={`email-${index}`}>Email:</label>
                                            <input
                                                type="email"
                                                name={`email`}
                                                id={`email-${index}`}
                                                value={traveler.email}
                                                onChange={(event) => handleInviteTravelerInputChange(index, 'email', event)}
                                                className='traveler-input'
                                                placeholder='Email'
                                            />
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
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/JourneyForm.css';

const JourneyForm = () => {
    const [journeyData, setJourneyData] = useState({
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
        inviteTravelers: [],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJourneyData({ ...journeyData, [name]: value });
    };

    const handleInviteTravelerInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInviteTravelers = [...journeyData.inviteTravelers];
        const travelerKey = name.split('-')[0];
        updatedInviteTravelers[index][travelerKey] = value;
        setJourneyData({ ...journeyData, inviteTravelers: updatedInviteTravelers });
    };

    const handleAddTraveler = () => {
        const newInviteTraveler = {
            firstName: '',
            lastName: '',
            email: '',

        }; console.log('newInviteTraveler:', newInviteTraveler);
        setJourneyData({
            ...journeyData,
            inviteTravelers: [...journeyData.inviteTravelers, newInviteTraveler],
        });
    };

    const handleRemoveTraveler = (index) => {
        const updatedInviteTravelers = [...journeyData.inviteTravelers];
        updatedInviteTravelers.splice(index, 1);
        setJourneyData({ ...journeyData, inviteTravelers: updatedInviteTravelers });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = Date.now().toString();
        setJourneyData({ ...journeyData, id: newId });
        // Save journey data to localStorage or perform other actions
        localStorage.setItem('journeyData', JSON.stringify(journeyData));
        console.log('Journey data saved:', journeyData);
    };

    useEffect(() => {
        const savedJourneyData = localStorage.getItem('journeyData');
        if (savedJourneyData) {
            setJourneyData(JSON.parse(savedJourneyData));
        }
    }, []);

    return (

        <Container>
            <div className="journeyForm">
                <div className="journeyForm-container">
                <h1 className="journeyForm-title mb-3">Start your Journey!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                 <Row>
                    <Col md={6}>
                    <div>
                     <label className="formlabel" htmlFor="destinationCity">Destination City:</label>
                        <input
                         className="form-input mb-3"
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
                        type="text"
                        name="destinationCountry"
                        id="destinationCountry"
                        value={journeyData.destinationCountry}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label  className="formlabel" htmlFor="departingDate">Departing Date:</label>
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
                    <label className="formlabel" htmlFor="returningDate">Returning Date:</label>
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
                    <label className="formlabel" htmlFor="transportationOutbound">Transportation Outbound:</label>
                    <input
                        className="form-input mb-3"
                        type="text"
                        name="transportationOutbound"
                        id="transportationOutbound"
                        value={journeyData.transportationOutbound}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="formlabel" htmlFor="transportationReturn">Transportation Return:</label>
                    <input
                        className="form-input mb-3"
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
                    <h3 className='invite'>Invite Travelers:</h3>
                    {journeyData.inviteTravelers.map((traveler, index) => (
                        <div key={index}>
                            <Row>
                                <Col md={6}>
                            <h4 className='traveler'>Traveler {index + 1}</h4>
                            <div>
                                <label htmlFor={`firstName-${index}`}>First Name:</label>
                                <input
                                    type="text"
                                    name={`firstName-${index}`}
                                    id={`firstName-${index}`}
                                    value={traveler.firstName}
                                    onChange={(event) => handleInviteTravelerInputChange(index, event)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`lastName-${index}`}>Last Name:</label>
                                <input
                                    type="text"
                                    name={`lastName-${index}`}
                                    id={`lastName-${index}`}
                                    value={traveler.lastName}
                                    onChange={(event) => handleInviteTravelerInputChange(index, event)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`email-${index}`}>Email:</label>
                                <input
                                    type="email"
                                    name={`email-${index}`}
                                    id={`email-${index}`}
                                    value={traveler.email}
                                    onChange={(event) => handleInviteTravelerInputChange(index, event)}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Button className='removet mb-3' type="button" onClick={() => handleRemoveTraveler(index)}>
                                Remove Traveler
                            </Button>
                        </div>
                        
                    ))}
                    <Button className='addt' type="button" onClick={handleAddTraveler}>
                        Add Traveler
                    </Button>
                </div>
                </Col>
             </Row>
             <Row>
                <Col className="submit d-flex justify-content-center mb-3">
                <Button type="submit">Submit</Button>
                </Col>
                </Row>
            </form>
            </div>
        </Container>
    )
}

export default JourneyForm;
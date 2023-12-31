import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "../../utils/localStorage";
import { useParams } from "react-router-dom";
import { Context } from "../../utils/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_JOURNEY } from "../../utils/mutations";

const EditJourneyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateContextJourneys } = useContext(Context);
  const [updateJourney] = useMutation(UPDATE_JOURNEY);
  const [journeyData, setJourneyData] = useState({
    destinationCity: "",
    destinationState: "",
    destinationCountry: "",
    departingDate: "",
    returningDate: "",
    transportationOutbound: "",
    transportationReturn: "",
    transportationDetails: "",
    accommodations: "",
    inviteTravelers: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJourneyData({ ...journeyData, [name]: value });
  };

  const handleInviteTravelerInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInviteTravelers = [...journeyData.inviteTravelers];
    updatedInviteTravelers[index][name] = value;
    setJourneyData({ ...journeyData, inviteTravelers: updatedInviteTravelers });
  };

  const handleAddTraveler = () => {
    const newInviteTraveler = {
      firstName: "",
      lastName: "",
      email: "",
    };
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

  const handleUpdate = (event) => {
    event.preventDefault();
          // Save journey data to localStorage or perform other actions
      saveToLocalStorage("journeyData", JSON.stringify(journeyData));
      console.log("Journey data saved:", journeyData);
      navigate("/dashboard");
      };

  const handleDelete = () => {
    // Handle the delete functionality
    // Delete the entry from localStorage
    console.log("Delete button clicked");

    // Remove the journeyData from localStorage
    removeFromLocalStorage("journeyData");

    // Navigate back to '/dashboard'
    navigate("/dashboard");

    window.location.reload();
  };


  const handleCancel = () => {
    // Handle the cancel functionality
    // Navigate back to '/dashboard'
    navigate("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save journey data to localStorage or perform other actions
    saveToLocalStorage("journeyData", JSON.stringify(journeyData));
    console.log("Journey data saved:", journeyData);
    navigate("/dashboard");
  };

  useEffect(() => {
    const allJourneys = getFromLocalStorage("journeys");
    const journeyToEdit = allJourneys.find((journey) => journey.id === id);
    console.log("Journey to edit:", journeyToEdit);
    console.log("ID", id);
    console.log("All available IDs: ", allJourneys.map((journey) => journey.id));
    if (journeyToEdit) {
      setJourneyData(journeyToEdit);
    }
  }, [id]);

  return (
    <Container className="journeyForm">
      <div>
        <div className="journeyForm-container">
          <   h1 className="journeyForm-title mb-3">Edit your Journey!</h1>
        </div>
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
              <label className="formlabel" htmlFor="departingDate">Departing Date:</label>
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
        {/* Other input fields */}
        {/* <button type="submit">Submit</button> */}
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button><br></br>
        <button type="button" onClick={handleCancel}>
          Return to Dashboard
        </button>
      </form>
    </Container>
  );
};

export default EditJourneyForm;

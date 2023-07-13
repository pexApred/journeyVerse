import React, { useState, useEffect } from "react";

const EditJourneyForm = () => {
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

  const handleUpdate = () => {
    // Handle the update functionality
    console.log("Update button clicked");
  };

  const handleDelete = () => {
    // Handle the delete functionality
    console.log("Delete button clicked");
  };

  const handleCancel = () => {
    // Handle the cancel functionality
    console.log("Cancel button clicked");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save journey data to localStorage or perform other actions
    localStorage.setItem("journeyData", JSON.stringify(journeyData));
    console.log("Journey data saved:", journeyData);
  };

  useEffect(() => {
    const savedJourneyData = localStorage.getItem("journeyData");
    if (savedJourneyData) {
      setJourneyData(JSON.parse(savedJourneyData));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destinationCity">Destination City:</label>
        <input
          type="text"
          name="destinationCity"
          id="destinationCity"
          value={journeyData.destinationCity}
          onChange={handleInputChange}
        />
      </div>
      {/* Other input fields */}
      <button type="submit">Submit</button>
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditJourneyForm;

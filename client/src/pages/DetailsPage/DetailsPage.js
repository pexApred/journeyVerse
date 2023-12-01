// import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import JourneyForm from "../../components/JourneyForm/JourneyForm";
import EditJourneyForm from "../../components/EditJourneyForm/EditJourneyForm";
import { Container } from "react-bootstrap";
import './DetailsPage.css';
const DetailsPage = () => {
  return (
    <div>
      {/* Header */}
      <NavBar />
      <EditJourneyForm />
      {/* <Footer /> */}
    </div>
  );
};
export default DetailsPage;
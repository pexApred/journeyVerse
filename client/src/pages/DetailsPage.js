// import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import JourneyForm from "../components/JourneyForm";
import EditJourneyForm from "../components/EditJourneyForm";
import { Container } from "react-bootstrap";
import '../css/DashboardPage.css';
const DetailsPage = () => {
  return (
      <div>
        {/* Header */}
        <NavBar />
        <div className="landing-page" style={{
          backgroundImage: `url('../background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <EditJourneyForm />
        </div>
        <Footer />
      </div>
  );
};
export default DetailsPage;
// import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import JourneyForm from "../components/JourneyForm";
import { Container } from "react-bootstrap";

const DetailsPage = () => {

  return (
    <>
    <div><NavBar /></div>
      <div>
        <Container>
          <JourneyForm />
        </Container>
      </div>
      <div><Footer /></div>
      
    </>
  );
};

export default DetailsPage;

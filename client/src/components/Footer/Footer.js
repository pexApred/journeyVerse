import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer mt-auto py-3'>
      <Container className="flex-grow-1">
        <Row>
          <Col className='text-center text-sm-left'>
            <Image src="journeyverse-logo.png" alt="Logo" className="logo" fluid />
          </Col>
          <Col xs={4} sm={4} className="text-center">
            <p className="footer-text">©2023 JourneyVerse</p>
          </Col>
          <Col xs={4} sm={4} className="text-center text-sm-right">
            <a href="https://github.com/pexApred/journeyVerse" className="footer-link">GitHub</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
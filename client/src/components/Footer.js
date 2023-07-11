import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footer fixed-bottom mt-auto py-3'>
      <Container className="flex-grow-1">
        <Row>
          <Col className='text-center text-sm-left'>
          <img src="/client/public/journeyverse-logo.png" alt="Logo" className="logo" />
          </Col>
          <Col xs={12} sm={4} className="text-center">
            <p className="footer-text">JourneyVerse ©2023</p>
          </Col>
          <Col xs={12} sm={4} className="text-center text-sm-right">
            <a href="https://github.com/pexApred/journeyVerse" className="footer-link">GitHub</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Image, Col } from 'react-bootstrap';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import AuthService from '../utils/auth';
import '../css/NavBar.css';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(AuthService.loggedIn());

  const handleLogout = () => {
    console.log('logout clicked');
    AuthService.logout();
    setLoggedIn(false);
    navigate('/');
    setShowModal(false);
  };

  return (
    <>
      <Navbar className="navbar" variant="dark" expand="lg">
        <Container fluid>
          {/* <Col className='text-center text-sm-left'>
            <Image src="./journeyverse-logo.png" alt="Logo" className="logo" fluid />           */}
            <Navbar.Brand className='title' as={Link} to="/">JourneyVerse</Navbar.Brand>
          {/* </Col> */}
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto d-flex">
              <Nav.Link as={Link} to="/"></Nav.Link>
              {loggedIn ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal">
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal" className='tab'>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm setShowModal={setShowModal} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignupForm setShowModal={setShowModal} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>

        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;

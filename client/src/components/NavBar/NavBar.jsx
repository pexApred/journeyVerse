import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../utils/auth";
import { Modal, Header, Tab, Nav } from "react-bootstrap";
import { useSpring, useTransition, animated } from "@react-spring/web";
import SignupForm from "../SignupForm/SignupForm";
import LoginForm from "../LoginForm/LoginForm";

import "./NavBar.css";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(AuthService.loggedIn());
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState("");

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)", rotateX: 0 },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)", rotateX: 360 },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)", rotate: 180 },
    config: { mass: 1, tension: 120, friction: 14, duration: 1000 },
    items: items,
  });

  const brandAnimation = useSpring({
    from: { width: "250px", height: "250px" },
    to: {
      width: isOpen ? "10000px" : "250px",
      height: isOpen ? "10000px" : "250px",
    },
    config: { duration: 400 },
  });

  const halfStyle = useSpring({
    to: {
      opacity: isOpen ? 1 : 1,
      color: isOpen ? "#ffffff" : "transparent",
    },
    config: { mass: 1, tension: 120, friction: 14, duration: 200 },
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
    setShowModal(false);
    navigate("/");
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleBrandClick = () => {
    console.log("Brand clicked");
    setShowNavModal(true);
  };

  const handleExploreClick = () => {
    setShowNavModal(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar"
        onClick={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <div className="brand" onClick={handleBrandClick}>
          <animated.div
            className="brand-background"
            style={brandAnimation}
          ></animated.div>
          {transitions((style, item) => (
            <animated.h4 className="title" style={style}>
              Journey
              <animated.span className="half" style={halfStyle}>
                Verse
              </animated.span>
            </animated.h4>
          ))}
          {isOpen && (
            <Modal
              size="lg"
              show={showNavModal}
              onHide={() => setShowNavModal(false)}
              aria-labelledby="navbar-modal"
              dialogClassName="full-screen-modal"
            >
              <Modal.Header>
                <button
                  type="button"
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNavModal(false);
                    setIsOpen(false);
                  }}
                >
                  &times;
                </button>
              </Modal.Header>
              <Modal.Body className="modal-body-center">
                <div className="navbar-dropdown">
                  <Link
                    className="home-link"
                    to="/"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNavModal(false);
                      setIsOpen(false);
                    }}
                  >
                    Explore
                  </Link>
                  {loggedIn ? (
                    <>
                      <Link
                        className="dashboard-link"
                        to="/dashboard"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowNavModal(false);
                          setIsOpen(false);
                        }}
                      >
                        My Trips
                      </Link>
                      <button className="button-links" onClick={handleLogout}>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      className="button-links"
                      onClick={() => {
                        setShowNavModal(false);
                        setIsOpen(false);
                        setShowModal(true);
                      }}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
      </nav>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal" className="tab">
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

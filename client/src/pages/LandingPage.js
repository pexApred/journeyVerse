import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <LoginForm />
      <SignupForm />
      <Footer />
    </>
  );
};

export default LandingPage;

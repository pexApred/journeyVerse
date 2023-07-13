// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
// useNavigate is a hook provided by react-router-dom to redirect the user programmatically
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations'
// import { Link } from "react-router-dom";
import AuthService from '../utils/auth';
import '../css/LoginForm.css';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      const { firstName, lastName, email } = data.login.user;

      AuthService.login(data.login.token, () => {
        navigate('/dashboard', { state: { firstName, lastName, email } })
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    setUserFormData({
      // username: '',
      email: '',
      password: '',
    });
    setValidated(false);
  };

  // useEffect(() => {
  //   if (AuthService.LoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          onClick={handleFormSubmit}
          className="fromlabel btn btn-block btn-info"
          style={{
            fontSize: '1.5rem',
        }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;

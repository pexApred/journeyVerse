// see SignupForm.js for comments
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
// useNavigate is a hook provided by react-router-dom to redirect the user programmatically
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../utils/mutations'
import { GET_JOURNEY } from '../../utils/queries';
// import { Link } from "react-router-dom";
import AuthService from '../../utils/auth';
import './LoginForm.css';
import { Context } from '../../utils/Context';
import { saveToLocalStorage } from '../../utils/localStorage';

const LoginForm = ({ setShowModal }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(Context);
  const { loading, error, data } = useQuery(GET_JOURNEY, {
    skip: !loggedIn,
  });

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
    } else {
      // setValidated(true);

      try {
        const { data } = await login({
          variables: { ...userFormData },
        });
        AuthService.login(data.login.token);
        setLoggedIn(true);
        setShowModal(false);
        // const { firstName, lastName, email } = data.login.user;

        // AuthService.login(data.login.token, () => {
        //   navigate('/dashboard', { state: { firstName, lastName, email } })
        // });
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
      setUserFormData({
        // username: '',
        email: '',
        password: '',
      });
      // setValidated(false);
    };
  };

  useEffect(() => {
    if (loggedIn && data && !loading && !error) {
      saveToLocalStorage('journeys', data.journeys);
    }
  }, [loggedIn, loading, error, data]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
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
            placeholder='*******'
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

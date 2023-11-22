import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import { Button, Form } from 'react-bootstrap';
import AuthService from "../../utils/auth";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/Context";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const { loggedIn, setLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (data?.createUser) {
      AuthService.login(data.createUser.token);
      setLoggedIn(true);
      setShowMessage(true)
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [data, setLoggedIn, navigate]);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handle profile picture upload
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    setFormState({
      ...formState,
      profilePicture: file,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: null,
    });
  };

  return (
    <main className="signup d-flex justify-content-center align-items-center vh-50">
      <div className="col-8 col-lg-8">
        <div className="card">
          {/* <h4 className="card-header" style={{ background: '#578F6A', color: '#FFFFFF' }}>Sign Up</h4> */}
          <div className="card-body">
            {showMessage ? (
              <p>
                Successfully Signed Up! You are being redirected to your JourneyVerse Dashboard.
              </p>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <input
                  className="form-input mb-3"
                  placeholder="Your First Name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <input
                  className="form-input mb-3"
                  placeholder="Your Last Name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="email">Email</Form.Label>
                <input
                  className="form-input mb-3"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="pwd">Password</Form.Label>
                <input
                  className="form-input mb-3"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="profilePicture">Profile Picture:</label>
                  <input
                    className="form-input mb-3"
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                <Button
                  className="btn btn-block btn-info"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </Form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;

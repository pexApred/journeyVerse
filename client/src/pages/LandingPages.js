import React, { useState } from 'react';

const LandingPages = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSignupInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
    // Process signup data
    console.log('Signup Data:', signupData);
    // Reset form
    setSignupData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePicture: null,
    });
    // Close signup modal
    setSignupModalOpen(false);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    // Process login data
    console.log('Login Data:', loginData);
    // Reset form
    setLoginData({
      email: '',
      password: '',
    });
    // Close login modal
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    // Process logout logic
    console.log('User logged out');
    // Open logout modal
    setLogoutModalOpen(true);
  };

  return (
    <div>
      {/* Signup Modal */}
      {signupModalOpen && (
        <div>
          <h2>Signup/Create Profile</h2>
          <form onSubmit={handleSignupFormSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={signupData.firstName}
                onChange={handleSignupInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={signupData.lastName}
                onChange={handleSignupInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={signupData.email}
                onChange={handleSignupInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Create Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={signupData.password}
                onChange={handleSignupInputChange}
              />
            </div>
            <div>
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setSignupData({ ...signupData, profilePicture: file });
                }}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      )}

      {/* Login Modal */}
      {loginModalOpen && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleLoginInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleLoginInputChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Logout Modal */}
      {logoutModalOpen && (
        <div>
          <h2>Logout</h2>
          <p>Are you sure you want to logout?</p>
          <button onClick={() => setLogoutModalOpen(false)}>Cancel</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Landing Page Content */}
      <h1>Welcome to JourneyVerse!</h1>
      <button onClick={() => setSignupModalOpen(true)}>Signup</button>
      <button onClick={() => setLoginModalOpen(true)}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LandingPages;
import React, { useState } from 'react';

const Login = ({ handleLoginFormSubmit }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic using loginData object
    handleLoginFormSubmit(loginData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
  );
};

export default Login;

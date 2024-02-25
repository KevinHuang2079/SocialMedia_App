import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegister = async () => {
    try {
      const checkResponse = await fetch('/auth/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!checkResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const checkData = await checkResponse.json();
      if (checkData.userAlreadyRegistered) {
        console.log('User already registered');
        // Update state to show the message on the web browser
        setRegistrationMessage('User already registered');
        return;
      }

      // Proceed with registration if the user is not already registered
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Register successful:', data);

      // Fetch user-specific data using userID
      const { userDocument } = data;
      const userID = userDocument._id;
      const userResponse = await fetch(`/api/user/find/${userID}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      console.log('User data:', userData);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      {registrationMessage && <p>{registrationMessage}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;

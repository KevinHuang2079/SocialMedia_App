import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import UserPage from './pages/UserPage';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div>
        <h1>Welcome to ClimbingApp</h1>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/dashboard" element={<UserPage />} />
        </Routes>
        {showLogin ? (
          <div>
            <h2>Login</h2>
            {/* Render the LoginComponent */}
            <LoginComponent />
            <p>Don't have an account? <button onClick={toggleForm}>Register</button></p>
          </div>
        ) : (
          <div>
            <h2>Register</h2>
            {/* Render the RegisterComponent */}
            <RegisterComponent />
            <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

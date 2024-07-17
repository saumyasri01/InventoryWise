import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './LoginPage.css';

function LoginPage({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123') {
      onLogin(username);
      // The success toast is handled in the App component
    } else {
      console.log('Invalid credentials'); // For debugging
      setErrorMessage('Invalid credentials');
      toast.error('Invalid credentials',{
        position: "top-center"} );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-page-overlay">
      <div className="login-page">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="login-note">If you need access or have any access issues, please contact <a href="mailto:support@inventorywise.com">support@inventorywise.com</a></p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default LoginPage;
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

function Account() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

async function handleLogin(e) {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  if (!email || !password) {
    setError('Please enter both email and password');
    setIsLoading(false);
    return;
  }

  try {
    // Try login (same endpoint for both)
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userData", JSON.stringify(data.data.user));

    // Check role and redirect accordingly
    if (data.data.user.role === 'admin') {
      window.location.href = "/adminDashboard";
    } else {
      window.location.href = "/parentsDashboard";
    }

  } catch (error) {
    console.error('Login error:', error);
    setError(error.message || 'An error occurred during login');
  } finally {
    setIsLoading(false);
  }
}

  function redirectToForgotPassword(e) {
    e.preventDefault();
    navigate('/forgotPassword');
  }

  return (
    <div className="login-page">
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft /> Back to Home
      </button>

      <div className="login-container">
        <div className="logo-container">
          <div className="logo-glow"></div>
          <img src={logo} alt="School Logo" className="logo" />
        </div>

        <div className="heading">
          <h1>Welcome Back!</h1>
          <p className="subtitle">Login to access your Step Ahead account</p>
          <p className="notice">Note: Login is only for registered parents and staff of Step Ahead School</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email..."
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password..."
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-options">
            <a href="" className="forgot-password" onClick={redirectToForgotPassword}>Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Account;
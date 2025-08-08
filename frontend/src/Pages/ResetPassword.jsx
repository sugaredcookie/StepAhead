import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import logo from '../assets/logo.png';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!location.state?.email) {
            navigate('/forgot-password');
        } else {
            setIsValid(true);
        }
    }, [location.state, navigate]);

    async function handleResetPassword(e) {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!password || !passwordConfirm) {
            setIsLoading(false);
            setMessage('Please enter both passwords');
            return;
        }

        if (password !== passwordConfirm) {
            setIsLoading(false);
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: location.state.email,
                    password,
                    passwordConfirm
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password reset failed');
            }

            setMessage('Password reset successfully! Redirecting to dashboard...');
            
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to dashboard after successful reset
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage(err.message || 'Something went wrong');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    if (!isValid) {
        return null; // or loading spinner
    }

    return (
        <div className="reset-password-page">
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

            <div className="reset-password-container">
                <div className="logo-container">
                    <div className="logo-glow"></div>
                    <img src={logo} alt="School Logo" className="logo" />
                </div>

                <div className="heading">
                    <h1>Reset Your Password</h1>
                    <p className="subtitle">Create a new password for your account</p>
                </div>

                <form onSubmit={handleResetPassword} className="reset-password-form">
                    <div className="input-group">
                        <div className="input-icon">
                            <FaLock />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="New password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <FaLock />
                        </div>
                        <input
                            id="passwordConfirm"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password..."
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                            minLength="8"
                        />
                    </div>

                    {message && (
                        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="reset-password-button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="spinner"></span>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                <div className="back-to-login">
                    Remember your password? <a href="/login">Login here</a>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
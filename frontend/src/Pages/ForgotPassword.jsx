import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import logo from '../assets/logo.png';
import { FaEnvelope, FaKey } from 'react-icons/fa';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    async function handleForgotPassword(e) {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if(!email) {
            setIsLoading(false);
            setMessage('Please enter your email');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgotPassword', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email})
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Request failed');
            }

            setMessage('OTP sent to your email. Please check and enter it below.');
            setShowOtpInput(true);
        }
        catch(err) {
            setMessage(err.message || 'Something went wrong');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleVerifyOtp(e) {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if(!otp) {
            setIsLoading(false);
            setMessage('Please enter the OTP');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/verifyResetCode', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    email: email,  // Include the email from state
                    code: otp     // The code the user entered
                })
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Verification failed');
            }

            // Navigate to reset password page with the verified email and code
            navigate('/resetPassword', { 
                state: { 
                    email: email,
                    resetCode: otp
                } 
            });
        }
        catch(err) {
            setMessage(err.message || 'Invalid OTP. Please try again.');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="forgot-password-page">
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

            <div className="forgot-password-container">
                <div className="logo-container">
                    <div className="logo-glow"></div>
                    <img src={logo} alt="School Logo" className="logo" />
                </div>

                <div className="heading">
                    <h1>{showOtpInput ? 'Verify OTP' : 'Reset Your Password'}</h1>
                    <p className="subtitle">
                        {showOtpInput 
                            ? `Enter the OTP sent to ${email}` 
                            : 'Enter your email to receive a reset OTP'}
                    </p>
                </div>

                {!showOtpInput ? (
                    <form onSubmit={handleForgotPassword} className="forgot-password-form">
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

                        {message && (
                            <div className={`message ${message.includes('OTP sent') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}

                        <button type="submit" className="forgot-password-button" disabled={isLoading}>
                            {isLoading ? (
                                <span className="spinner"></span>
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="forgot-password-form">
                        <div className="input-group">
                            <div className="input-icon">
                                <FaKey />
                            </div>
                            <input 
                                id="otp" 
                                type="text" 
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Enter 6-digit OTP"
                                value={otp} 
                                onChange={(e) => {
                                    // Ensure only numbers are entered
                                    const value = e.target.value.replace(/\D/g, '');
                                    setOtp(value);
                                }}
                                maxLength={6}
                                required 
                            />
                        </div>

                        {message && (
                            <div className={`message ${message.includes('verified') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}

                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="secondary-button"
                                onClick={() => {
                                    setShowOtpInput(false);
                                    setMessage('');
                                }}
                            >
                                Back
                            </button>
                            <button 
                                type="submit" 
                                className="forgot-password-button" 
                                disabled={isLoading || otp.length !== 6}
                            >
                                {isLoading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                <div className="back-to-login">
                    Remember your password? <a href="/login">Login here</a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
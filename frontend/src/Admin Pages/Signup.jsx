import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../assets/logo.png';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';

function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userId)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                setError('Failed to copy ID');
            });
    };

    async function handleSignup(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!fullName || !email || !password || !passwordConfirm) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password, passwordConfirm })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            setUserId(data.data.user._id);
            
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message || 'Something went wrong during signup');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="signup-page">
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
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft /> Back to Student Management
            </button>

            <div className="signup-container">
                <div className="logo-container">
                    <div className="logo-glow"></div>
                    <img src={logo} alt="School Logo" className="logo" />
                </div>

                <div className="heading">
                    <h1>{userId ? 'Registration Complete!' : 'Create Parent Account'}</h1>
                    <p className="subtitle">
                        {userId ? 'Your parent account has been created' : 'Join the Step Ahead community'}
                    </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {userId ? (
                    <div className="success-container">
                        <div className="id-display">
                            <p className="id-label">Your Parent ID:</p>
                            <div className="id-value-container">
                                <span className="id-value">{userId}</span>
                                <button 
                                    onClick={copyToClipboard} 
                                    className="copy-button"
                                    aria-label="Copy to clipboard"
                                >
                                    {isCopied ? <FaCheck /> : <FaCopy />}
                                </button>
                            </div>
                            {isCopied && <span className="copy-feedback">Copied!</span>}
                        </div>
                        <p className="instruction">
                            Please save this ID securely. You'll need it when registering the student.
                        </p>
                        <button 
                            onClick={() => navigate('/newStudent')} 
                            className="continue-button"
                        >
                            Continue to Student Form
                        </button>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSignup} className="signup-form">
                            <div className="input-group">
                                <div className="input-icon">
                                    <FaUser />
                                </div>
                                <input 
                                    id="fullName" 
                                    type="text" 
                                    placeholder="Enter parent's full name..."
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="input-group">
                                <div className="input-icon">
                                    <FaEnvelope />
                                </div>
                                <input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter your parent's email"
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
                                    placeholder="Create a password..."
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm your password..."
                                    value={passwordConfirm} 
                                    onChange={(e) => setPasswordConfirm(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button 
                                type="submit" 
                                className="signup-button" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </form> 
                    </>
                )}
            </div>
        </div>
    );
}

export default Signup;
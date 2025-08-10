import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Contact.css'

function Contact() {
    const navigate = useNavigate();

    function handleBackButton() {
        navigate('/');
    }

    return (
        <div className="contact-container">
            {/* Header with back button */}
            <header className="contact-header">
                <button onClick={handleBackButton} className="back-buttons">
                    &larr; Back
                </button>
                <h1>Contact Us</h1>
            </header>

            {/* Main content */}
            <main className="contact-content">
                {/* Contact information section */}
                <section className="contact-info">
                    <h2>Get in Touch</h2>
                    <div className="info-card">
                        <div className="info-item">
                            <FaMapMarkerAlt className="info-icon" />
                            <div>
                                <h3>Address</h3>
                                <p>Shop No. 6 & 8, Step Ahead Pre School, Royal Meadows, Koproli, Panvel, Maharashtra 410206</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaPhone className="info-icon" />
                            <div>
                                <h3>Phone</h3>
                                <p>+91-7666453824</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaEnvelope className="info-icon" />
                            <div>
                                <h3>Email</h3>
                                <p>stepaheadpanvel@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaClock className="info-icon" />
                            <div>
                                <h3>Working Hours</h3>
                                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                                <p>Saturday: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/profile.php?id=61560304813958" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="social-icon" />
                            </a>
                            <a href="https://www.instagram.com/step_ahead_pre_school_panvel/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://www.youtube.com/@stepaheadpanvel" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="social-icon" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Google Maps section */}
                <section className="map-section">
                    <h2>Our Location</h2>
                    <div className="map-container">
                        <iframe
                            title="Step Ahead Pre-Primary School Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.49396453672!2d73.1598533!3d19.013722799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9c03328f8c7%3A0x6becc9d6be6105be!2sSTEP%20AHEAD!5e1!3m2!1sen!2sin!4v1749934409832!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="direction-buttons">
                        <a
                            href="https://www.google.com/maps/dir//STEP+AHEAD+Shop+No.+8,+Step+Ahead+Pre+School,+Royal+Meadows+Arihant+Arham,+Panvel+Koproli,+Maharashtra+410206/@19.0137228,73.1598533,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7e9c03328f8c7:0x6becc9d6be6105be"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="direction-button"
                        >
                            Get Directions
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Contact;
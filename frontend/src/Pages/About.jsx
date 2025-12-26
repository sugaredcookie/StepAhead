import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChild, FaGraduationCap, FaUsers, FaChartLine, FaAward } from 'react-icons/fa';
import './About.css';

function About() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Function to verify authentication status
    const checkAuthStatus = async () => {
        try {
            // Option 1: Check localStorage (if you store token there)
            const token = localStorage.getItem('token');
            
            if (token) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAuthenticated(false);
        }
    };

    function handleBackButton() {
        if (isAuthenticated) {
            navigate('/parentsDashboard');
        } else {
            navigate('/');
        }
    }

    return (
        <div className="about-container">
            {/* Header with back button */}
            <header className="about-header">
                <button onClick={handleBackButton} className="back-btns">
                    &larr; Back
                </button>
                <h1>About Step Ahead</h1>
            </header>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <h2>Nurturing Young Minds Since 2021</h2>
                    <p>Step Ahead Pre-Primary School has been a cornerstone of early childhood education in Panvel, providing a safe and stimulating environment where children can grow, learn, and thrive.</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="our-story">
                <div className="section-content">
                    <div className="text-content">
                        <h2>Our Story</h2>
                        <p>Step Ahead Pre-School, founded on 6th March 2021 by Mrs. Rita Sahay under the Aryabhatta Trust(which also runs the esteemed Aryabhatta Niketan School, est. 1986), is a values-driven early learning center in Panvel.

                        Powered by Kreedo and follow CBSE, ICSE, and IGCSE curriculum, the school offers classes from Pre-Nursery to Senior KG, focusing on holistic development through storytelling, yoga, music, art, and play-based activities with scientific materials.

                        With a nurturing environment, dedicated educators, and strong community support, Step Ahead empowers children to become confident, kind, and independent thinkers—laying a joyful foundation for lifelong learning.</p>
                    </div>
                    <div className="image-content">
                        <div className="image-placeholder"></div>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="our-approach">
                <h2>Our Educational Approach</h2>
                <div className="approach-grid">
                    <div className="approach-card">
                        <FaChild className="approach-icon" />
                        <h3>Learning Beyond Books</h3>
                        <p>We combine academics with hands-on experiences, ensuring children learn by doing—not just by reading.</p>
                    </div>
                    <div className="approach-card">
                        <FaGraduationCap className="approach-icon" />
                        <h3>Strong Values, Daily Practice</h3>
                        <p>We start each day with prayer, yoga, and the national anthem, weaving discipline, mindfulness, and patriotism into daily life.</p>
                    </div>
                    <div className="approach-card">
                        <FaUsers className="approach-icon" />
                        <h3>Activity-Rich Curriculum</h3>
                        <p>Every week brings new celebrations, creative arts, skill-building activities, and joyful exploration—making learning exciting and meaningful.</p>
                    </div>
                    <div className="approach-card">
                        <FaChartLine className="approach-icon" />
                        <h3>Personal Attention & Community Bonding</h3>
                        <p>With small batches, caring teachers, and a close-knit environment, every child is known, nurtured, and celebrated.</p>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="achievements">
                <h2>Our Achievements</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaAward className="stat-icon" />
                        <div className="stat-number">4+</div>
                        <div className="stat-label">Years of Excellence</div>
                    </div>
                    <div className="stat-card">
                        <FaUsers className="stat-icon" />
                        <div className="stat-number">100+</div>
                        <div className="stat-label">Students Enrolled</div>
                    </div>
                    <div className="stat-card">
                        <FaGraduationCap className="stat-icon" />
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Parent Satisfaction</div>
                    </div>
                    <div className="stat-card">
                        <FaChild className="stat-icon" />
                        <div className="stat-number">10:1</div>
                        <div className="stat-label">Student-Teacher Ratio</div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>What Parents Say</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <div className="quote">"Best pre-nursery school in the area — friendly atmosphere, excellent teaching skills, highly recommended!"</div>
                        <div className="author">- Mrs. Bansod, Parent</div>
                    </div>
                    <div className="testimonial-card">
                        <div className="quote">"A well-structured curriculum with a perfect balance of academics and hands-on activities for holistic growth."</div>
                        <div className="author">- Mrs. Verma, Parent</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <h2>Ready to Join Our Learning Community?</h2>
                <button onClick={() => navigate('/admission')} className="cta-button">
                    Enquire About Admission
                </button>
            </section>
        </div>
    );
}

export default About;
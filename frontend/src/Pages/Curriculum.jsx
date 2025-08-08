import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaChild, FaPaintBrush, FaMusic, FaRunning, FaGlobeAsia } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';
import { GiBrain } from 'react-icons/gi';
import './Curriculum.css';

function Curriculum() {
    const navigate = useNavigate();

    function redirectToContact() {
        navigate('/contact');
    }

    function handleBackButton() {
        if (isAuthenticated) {
            navigate('/parentsDashboard');
        } else {
            navigate('/');
        }
    }

    return (
        <div className="curriculum-container">
            {/* Header with back button */}
            <header className="curriculum-header">
                <button onClick={handleBackButton} className="back-button">
                    &larr; Back
                </button>
                <h1>Our Curriculum</h1>
            </header>

            {/* Hero Section */}
            <section className="curriculum-hero">
                <div className="hero-content">
                    <h2>Holistic Early Childhood Development</h2>
                    <p>Our play-based curriculum is designed to nurture all aspects of your child's growth - cognitive, physical, social, and emotional.</p>
                </div>
            </section>

            {/* Curriculum Approach Section */}
            <section className="approach-section">
                <h2>Our Educational Philosophy</h2>
                <div className="approach-cards">
                    <div className="approach-card">
                        <FaChild className="approach-icon" />
                        <h3>Child-Centered</h3>
                        <p>Activities tailored to each child's interests and developmental stage</p>
                    </div>
                    <div className="approach-card">
                        <GiBrain className="approach-icon" />
                        <h3>Brain-Based</h3>
                        <p>Methods aligned with how young brains learn best</p>
                    </div>
                </div>
            </section>

            {/* Program Sections */}
            <section className="program-sections">
                {/* Language Development */}
                <div className="program-card">
                    <div className="program-icon">
                        <FaBookOpen />
                    </div>
                    <div className="program-content">
                        <h3>Language & Literacy</h3>
                        <ul>
                            <li>Phonics awareness</li>
                            <li>Storytelling & dramatic play</li>
                            <li>Vocabulary building</li>
                            <li>Pre-writing skills</li>
                        </ul>
                    </div>
                </div>

                {/* Math & Logic */}
                <div className="program-card">
                    <div className="program-icon">
                        <FaGlobeAsia />
                    </div>
                    <div className="program-content">
                        <h3>Math & Logical Thinking</h3>
                        <ul>
                            <li>Number recognition</li>
                            <li>Sorting & patterning</li>
                            <li>Basic shapes & measurements</li>
                            <li>Problem-solving activities</li>
                        </ul>
                    </div>
                </div>

                {/* Creative Arts */}
                <div className="program-card">
                    <div className="program-icon">
                        <FaPaintBrush />
                    </div>
                    <div className="program-content">
                        <h3>Creative Arts</h3>
                        <ul>
                            <li>Drawing & painting</li>
                            <li>Clay modeling</li>
                            <li>Collage & craft</li>
                            <li>Creative expression</li>
                        </ul>
                    </div>
                </div>

                {/* Music & Movement */}
                <div className="program-card">
                    <div className="program-icon">
                        <FaMusic />
                    </div>
                    <div className="program-content">
                        <h3>Music & Movement</h3>
                        <ul>
                            <li>Rhythm & beat activities</li>
                            <li>Singing & dancing</li>
                            <li>Instrument exploration</li>
                            <li>Gross motor development</li>
                        </ul>
                    </div>
                </div>

                {/* Physical Development */}
                <div className="program-card">
                    <div className="program-icon">
                        <FaRunning />
                    </div>
                    <div className="program-content">
                        <h3>Physical Development</h3>
                        <ul>
                            <li>Outdoor play</li>
                            <li>Yoga for kids</li>
                            <li>Fine motor activities</li>
                            <li>Coordination exercises</li>
                        </ul>
                    </div>
                </div>

                {/* Social-Emotional */}
                <div className="program-card">
                    <div className="program-icon">
                        <IoMdColorPalette />
                    </div>
                    <div className="program-content">
                        <h3>Social-Emotional Learning</h3>
                        <ul>
                            <li>Sharing & cooperation</li>
                            <li>Emotion recognition</li>
                            <li>Conflict resolution</li>
                            <li>Self-help skills</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Daily Schedule - Improved Version */}
            <section className="daily-schedule">
                <h2>Sample Daily Schedule</h2>
                <div className="schedule-container">
                    {/* Schedule Item 1 */}
                    <div className="schedule-item">
                        <div className="schedule-time">9:00 - 9:30 AM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Welcome & Free Play</h3>
                            <p>Children settle in with supervised play activities</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 2 */}
                    <div className="schedule-item">
                        <div className="schedule-time">9:30 - 10:00 AM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Circle Time</h3>
                            <p>Morning greetings, calendar, weather, and theme discussion</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 3 */}
                    <div className="schedule-item">
                        <div className="schedule-time">10:00 - 10:45 AM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Learning Centers</h3>
                            <p>Rotating through language, math, and science activities</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 4 */}
                    <div className="schedule-item">
                        <div className="schedule-time">10:45 - 11:15 AM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Snack Time</h3>
                            <p>Healthy snack while practicing social skills</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 5 */}
                    <div className="schedule-item">
                        <div className="schedule-time">11:15 - 12:00 PM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Outdoor Play</h3>
                            <p>Gross motor development on our playground</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 6 */}
                    <div className="schedule-item">
                        <div className="schedule-time">12:00 - 12:30 PM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Creative Arts</h3>
                            <p>Art, music, or drama activities</p>
                        </div>
                    </div>
                    
                    {/* Schedule Item 7 */}
                    <div className="schedule-item">
                        <div className="schedule-time">12:30 - 1:00 PM</div>
                        {/* <div className="schedule-dot"></div> */}
                        <div className="schedule-content">
                            <h3>Story Time & Dismissal</h3>
                            <p>Interactive read-aloud and preparation for home</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Section */}
            <section className="assessment-section">
                <h2>Progress Assessment</h2>
                <div className="assessment-content">
                    <p>We use ongoing, observation-based assessments to track each child's development across all learning domains. Parents receive:</p>
                    <ul>
                        <li>Quarterly progress reports</li>
                        <li>Parent-teacher conferences</li>
                        <li>Portfolios of children's work</li>
                        <li>Regular informal updates</li>
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <section className="curriculum-cta">
                <h2>Want to Learn More About Our Curriculum?</h2>
                <button onClick={redirectToContact} className="cta-button">
                    Contact Us
                </button>
            </section>
        </div>
    );
}

export default Curriculum;
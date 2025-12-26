import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaImages, FaBookOpen, FaBell, FaInfoCircle, FaEnvelope, FaHome,FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  function redirectToContact() {
    navigate('/contact');
  }

  function redirectToAbout() {
    navigate('/about');
  }

  function redirectToAdmission() {
    navigate('/admission');
  }
  
  function redirectToCurriculum() {
    navigate('/curriculum');
  }

  function redirectToCalendar() {
    navigate('/calendar');
  }

  function redirectToGallery() {
    navigate('/gallery');
  }

  function redirectToHome() {
    navigate('/');
  }

  function handleLogin() {
    navigate('/login');
  }

    return(
        <nav className="navBar">
        <ul>
            <li onClick={redirectToHome}><FaHome className="nav-icon" /> Home</li>
            <li onClick={redirectToAdmission}><FaUserGraduate className="nav-icon"/> Enquiry</li>
            <li onClick={redirectToGallery}><FaImages className="nav-icon" /> Gallery</li>
            <li onClick={redirectToCalendar}><FaCalendarAlt className="nav-icon" /> Calendar</li>
            <li onClick={redirectToCurriculum}><FaBookOpen className="nav-icon" /> Curriculum</li>
            <li onClick={redirectToAbout}><FaInfoCircle className="nav-icon" /> About Us</li>
            <li onClick={redirectToContact}><FaEnvelope className="nav-icon" /> Contact Us</li>
        </ul>
        {/* <div className="authButton">
            {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-glow">
                <span className="btn-text">Logout</span>
                <span className="btn-gradient"></span>
            </button>
            ) : (
            <button onClick={handleLogin} className="btn-glow">
                <span className="btn-text">Login</span>
                <span className="btn-gradient"></span>
            </button>
            )}
        </div> */}
        </nav>
    )
}

export default Navbar;
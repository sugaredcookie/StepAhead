import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ParentsDashboard.css';
import logo from '../assets/logo.png';
import { 
  FaUserGraduate, 
  FaCalendarAlt, 
  FaImages, 
  FaBookOpen, 
  FaInfoCircle, 
  FaEnvelope, 
  FaHome,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaPaintBrush,
  FaMusic,
  FaRunning,
  FaBook,
  FaUtensils
} from 'react-icons/fa';

function ParentsDashboard() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  }

  function redirectToChildInfo() {
    navigate('/childInfo');
  }

  function redirectToCalender() {
    navigate('/calendar');
  }

  function redirectToAbout() {
    navigate('/about');
  }

  function redirectToGallery() {
    navigate('/gallery');
  }

  // Sample activities data
  const todaysActivities = [
    { time: '9:00 AM', activity: 'Circle Time', icon: <FaUserGraduate className="activity-icon" /> },
    { time: '10:00 AM', activity: 'Art & Craft', icon: <FaPaintBrush className="activity-icon" /> },
    { time: '11:00 AM', activity: 'Music Session', icon: <FaMusic className="activity-icon" /> },
    { time: '12:00 PM', activity: 'Lunch Time', icon: <FaUtensils className="activity-icon" /> },
    { time: '1:00 PM', activity: 'Story Time', icon: <FaBook className="activity-icon" /> },
    { time: '2:00 PM', activity: 'Outdoor Play', icon: <FaRunning className="activity-icon" /> }
  ];

  return (
    <div className="dashboardContainer">
      {/* Floating Particles Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>

      <header className="topBanner">
        <div className="logoContainer">
          <div className="logoWrapper">
            <img src={logo} alt="School Logo" className="schoolLogo" />
            <div className="logoGlow"></div>
          </div>
          <div className="schoolTitle">
            <h1>Step Ahead Pre School, Panvel</h1>
            <p className="tagline">Nurturing Young Minds for a Brighter Future</p>
          </div>
        </div>
      </header>

      <nav className="navBar">
        <ul>
          <li onClick={(useNavigate('/parentDashboard'))}><FaHome className="nav-icon" /> Home</li>
          <li onClick={redirectToGallery}><FaImages className="nav-icon" /> Gallery</li>
          <li onClick={redirectToCalender}><FaCalendarAlt className="nav-icon" /> Calendar</li>
          <li><FaBookOpen className="nav-icon" /> Curriculum</li>
          <li onClick={redirectToAbout}><FaInfoCircle className="nav-icon" /> About Us</li>
          <li><FaEnvelope className="nav-icon" /> Contact Us</li>
        </ul>
        <div className="authButton">
          <div className="userMenuContainer">
            <div 
              className="userMenuTrigger" 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle className="userIcon" />
              <span className="userText">My Account</span>
              {showUserMenu ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showUserMenu && (
              <div className="userMenuDropdown">
                <div className="menuItem" onClick={redirectToChildInfo}>
                  <FaUserGraduate className="menuIcon"/>
                  My Child's Info
                </div>

                <div className="menuItem logout" onClick={handleLogout}>
                  <FaEnvelope className="menuIcon" />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="dashboardContent">
        <div className="welcomeBanner">
          <h2>Welcome Back!</h2>
          <p>Access your child's information and school updates</p>
        </div>

        <div className="dashboardWidgets">
          <div className="widget todaysActivities">
            <h3>Today's Activities</h3>
            <div className="activitiesList">
              {todaysActivities.map((activity, index) => (
                <div key={index} className="activityItem">
                  <div className="activityTime">{activity.time}</div>
                  <div className="activityIcon">{activity.icon}</div>
                  <div className="activityName">{activity.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footerContent">
          <div className="footerColumn">
            <h4>Quick Links</h4>
            <ul>
              <li>Admission Process</li>
              <li>School Calendar</li>
              <li>Parent Resources</li>
              <li>Photo Gallery</li>
            </ul>
          </div>
          <div className="footerColumn">
            <h4>Contact Us</h4>
            <p>Shop No. 8, Step Ahead Pre School, Royal Meadows, Arihant Arham <br /> Panvel, Koproli, Maharashtra 410206</p>
            <p>Phone: +91-7666453824</p>
            <p>Email: stepaheadpanvel@gmail.com</p>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; {new Date().getFullYear()} Step Ahead Pre-Primary School Panvel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ParentsDashboard;
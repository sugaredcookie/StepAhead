import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaHome,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaEye,
  FaEdit,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaSchool,
  FaGraduationCap
} from 'react-icons/fa';
import './AdminDashboard.css'
import logo from '../assets/logo.png';

function AdminDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setStudents(data.data.students);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Motivational quotes for the dashboard
  const motivationalQuotes = [
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The function of education is to teach one to think intensively and to think critically. - Martin Luther King Jr.",
    "Education is not preparation for life; education is life itself. - John Dewey",
    "The roots of education are bitter, but the fruit is sweet. - Aristotle",
    "Teaching is the greatest act of optimism. - Colleen Wilcox"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  function redirectToStudentInfo() {
    navigate('/studentInfo');
  }

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="School Logo" />
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <FaHome className="menu-icon" /> Dashboard
          </li>
          <li className={activeTab === 'students' ? 'active' : ''} onClick={redirectToStudentInfo}>
            <FaUserGraduate className="menu-icon" /> Students
          </li>
        </ul>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-topbar">
          <div className="admin-profile">
            <div className="profile-info">
              <span className="admin-name">Administrator</span>
              <span className="admin-role">Super Admin</span>
            </div>
            <div className="profile-avatar">
              <span>A</span>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <div className="admin-content-section">
              <h2>Dashboard Overview</h2>
              <div className="welcome-message">
                <p>Welcome back, Administrator! Here's what's happening today.</p>
                <div className="motivational-quote">
                  <blockquote>"{randomQuote}"</blockquote>
                </div>
              </div>
              
              <div className="main-stat-container">
                <div className="main-stat-card">
                  <FaUserGraduate className="stat-icon-large" />
                  <div className="stat-content">
                    <h3>Total Students</h3>
                    <p className="stat-value-large">{students.length}</p>
                    <p className="stat-description">Currently enrolled in our school</p>
                  </div>
                </div>
              </div>

              <div className="quick-stats-container">
                <div className="quick-stat-card">
                  <FaChalkboardTeacher className="quick-stat-icon" />
                  <h4>Active Teachers</h4>
                  <p className="quick-stat-value">24</p>
                </div>
                <div className="quick-stat-card">
                  <FaSchool className="quick-stat-icon" />
                  <h4>Total Classes</h4>
                  <p className="quick-stat-value">8</p>
                </div>
                <div className="quick-stat-card">
                  <FaGraduationCap className="quick-stat-icon" />
                  <h4>Student Capacity</h4>
                  <p className="quick-stat-value">240</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
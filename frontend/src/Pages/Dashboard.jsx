import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/logo.png';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaImages, FaBookOpen, FaBell, FaInfoCircle, FaEnvelope, FaHome,FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

function Dashboard() {
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

  function handleLogin() {
    navigate('/login');
  }

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
            <img src={logo} alt="Step Ahead Logo" className="schoolLogo" />
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
          <li><FaHome className="nav-icon" /> Home</li>
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

      <section className="heroSection">
        <div className="heroContent">
          <div className="heroText">
            <h2>
              <span className="heroTitle">Welcome to Step Ahead</span>
              <span className="heroSubtitle">Where Learning Begins with Joy</span>
            </h2>
            <p>Our innovative approach to early childhood education combines play-based learning with structured activities to foster cognitive, social, and emotional development in a safe and nurturing environment.</p>
            <button className="ctaButton" onClick={redirectToCurriculum}>Go Through Our Curriculum</button>
          </div>
          <div className="heroIllustration">
            <div className="floatingElements">
              <div className="floatingElement book"></div>
              <div className="floatingElement abc"></div>
              <div className="floatingElement crayon"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="infoSection">
        <div className="infoCard card-hover">
          <div className="cardIcon mission"></div>
          <h3>Our Mission</h3>
          <p>To provide a nurturing environment where young minds flourish through creative learning experiences that spark curiosity and build confidence.</p>
          <div className="cardWave"></div>
        </div>
        <div className="infoCard card-hover">
          <div className="cardIcon choose"></div>
          <h3>Why Choose Us</h3>
          <ul className="benefitsList">
            <li>Certified & Caring Educators</li>
            <li>Safe & Stimulating Campus</li>
            <li>Holistic Development Programs</li>
            <li>Small Class Sizes</li>
          </ul>
          <div className="cardWave"></div>
        </div>
        <div className="infoCard card-hover">
          <div className="cardIcon hours"></div>
          <h3>School Hours</h3>
          <p className="timings">Monday - Friday<br/>9:00 AM - 2:00 PM</p>
          <p className="ageGroup">For children 2-6 years</p>
          <div className="cardWave"></div>
        </div>
      </section>

      <section className="teachersSection">
        <div className="sectionHeader">
          <h3>Meet Our Educators</h3>
          <p className="sectionSubtitle">Passionate professionals dedicated to your child's growth</p>
        </div>
        <div className="teacherGrid">
          <div className="teacherCard">
            <div className="teacherAvatar t1"></div>
            <h4>Ms. Reema</h4>
            <p>Class Teacher</p>
            <div className="teacherBio">10 years experience in early childhood education with Montessori certification</div>
          </div>
          <div className="teacherCard">
            <div className="teacherAvatar t2"></div>
            <h4>Mr. Raj</h4>
            <p>Music Teacher</p>
            <div className="teacherBio">Professional musician specializing in child development through music</div>
          </div>
          <div className="teacherCard">
            <div className="teacherAvatar t3"></div>
            <h4>Ms. Anita</h4>
            <p>Art & Craft</p>
            <div className="teacherBio">Art therapist helping children express themselves creatively</div>
          </div>
          <div className="teacherCard">
            <div className="teacherAvatar t4"></div>
            <h4>Ms. Priya</h4>
            <p>Physical Education</p>
            <div className="teacherBio">Specialized in motor skill development through play activities</div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="sectionHeader">
          <h3>What Parents Say</h3>
          <p className="sectionSubtitle">Trusted by families in our community</p>
        </div>
        <div className="testimonialCarousel">
          <div className="testimonialCard">
            <div className="quoteIcon">"</div>
            <p className="testimonialText">My daughter has blossomed at Step Ahead. The teachers truly understand how to make learning fun while building important skills.</p>
            <div className="testimonialAuthor">- Mrs. Sharma, Parent</div>
          </div>
          <div className="testimonialCard">
            <div className="quoteIcon">"</div>
            <p className="testimonialText">The safe environment and creative curriculum were exactly what we were looking for. Our son looks forward to school every day!</p>
            <div className="testimonialAuthor">- Mr. Patel, Parent</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerContent">
          <div className="footerColumn">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={redirectToAdmission}>Admission Process</li>
              <li onClick={redirectToCalendar}>School Calendar</li>
              {/* <li>Parent Resources</li> */}
              <li onClick={redirectToGallery}>Photo Gallery</li>
            </ul>
          </div>
          <div className="footerColumn">
            <h4>Contact Us</h4>
            <p>Shop No. 6 & 8, Step Ahead Pre School, Royal Meadows, Arihant Arham <br /> Panvel, Koproli, Maharashtra 410206</p>
            <p>Phone: +91-7666453824</p>
            <p>Email: stepaheadpanvel@gmail.com</p>
          </div>
          <div className="socialIcons">
            <a href="https://www.facebook.com/profile.php?id=61560304813958" 
              target="_blank" rel="noopener noreferrer" 
              className="facebook">
                <FaFacebook />
            </a>
            <a href="https://www.instagram.com/step_ahead_pre_school_panvel/" 
              target="_blank" rel="noopener noreferrer" 
              className="instagram">
                <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@stepaheadpanvel" 
              target="_blank" rel="noopener noreferrer" 
              className="youtube">
                <FaYoutube />
            </a>
          </div>

        </div>
        <div className="footerBottom">
          <p>&copy; {new Date().getFullYear()} Step Ahead Pre-Primary School Panvel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
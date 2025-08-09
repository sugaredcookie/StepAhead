import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChild, FaBirthdayCake, FaUser, FaPhone, FaEnvelope, FaHome, FaSchool, FaBook, FaPaperPlane } from 'react-icons/fa';
import './Admission.css';
import logo from '../assets/logo.png'

function Admission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    motherName: '',
    fatherName: '',
    contactNumber: '',
    alternateContactNumber: '',
    email: '',
    address: '',
    previousSchool: '',
    classToApply: '',
    message: '',
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: 'Submitting your application...', type: 'info' });

    try {
      const response = await fetch('https://stepahead-production-8067.up.railway.app/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          message: data.message || 'Application submitted successfully! Our team will contact you soon.', 
          type: 'success' 
        });
        setFormData({
          childName: '',
          dateOfBirth: '',
          motherName: '',
          fatherName: '',
          contactNumber: '',
          alternateContactNumber: '',
          email: '',
          address: '',
          previousSchool: '',
          classToApply: '',
          message: '',
        });
        
        // Show success animation
        document.querySelector('.formSuccessAnimation').style.display = 'block';
        setTimeout(() => {
          document.querySelector('.formSuccessAnimation').style.display = 'none';
        }, 3000);
      } else {
        setStatus({ 
          message: data.error || 'Submission failed. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error) {
      setStatus({ 
        message: 'Network error. Please check your connection and try again.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admissionPage">
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

      {/* Success Animation */}
      <div className="formSuccessAnimation">
        <div className="animationCircle"></div>
        <div className="animationCheckmark"></div>
        <div className="animationConfetti">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="confettiPiece"></div>
          ))}
        </div>
      </div>

      <div className="admissionContainer">
        <div className="formHeader">
            <img src={logo} alt="School Logo" className="schoolLogo" />
            <div className="headerText">
                <h2>Enquiry Application</h2>
                <p className="formSubtitle">Ask away your queries</p>
            </div>
        </div>

        <form className="admissionForm" onSubmit={handleSubmit}>
          <div className="formSection">
            <h3><FaChild className="sectionIcon" /> Child Information</h3>
            <div className="formRow">
              <div className="formGroup">
                <label>Child's Full Name</label>
                <div className="inputWithIcon">
                  <FaUser className="inputIcon" />
                  <input 
                    type="text" 
                    name="childName" 
                    placeholder="Enter child's name" 
                    value={formData.childName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="formGroup">
                <label>Date of Birth</label>
                <div className="inputWithIcon">
                  <FaBirthdayCake className="inputIcon" />
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="formSection">
            <h3><FaUser className="sectionIcon" /> Parent Information</h3>
            <div className="formRow">
              <div className="formGroup">
                <label>Mother's Name</label>
                <div className="inputWithIcon">
                  <FaUser className="inputIcon" />
                  <input 
                    type="text" 
                    name="motherName" 
                    placeholder="Mother's full name" 
                    value={formData.motherName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="formGroup">
                <label>Father's Name</label>
                <div className="inputWithIcon">
                  <FaUser className="inputIcon" />
                  <input 
                    type="text" 
                    name="fatherName" 
                    placeholder="Father's full name" 
                    value={formData.fatherName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="formSection">
            <h3><FaPhone className="sectionIcon" /> Contact Information</h3>
            <div className="formRow">
              <div className="formGroup">
                <label>Primary Contact Number</label>
                <div className="inputWithIcon">
                  <FaPhone className="inputIcon" />
                  <input 
                    type="tel" 
                    name="contactNumber" 
                    placeholder="Mobile number" 
                    value={formData.contactNumber} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="formGroup">
                <label>Alternate Contact Number</label>
                <div className="inputWithIcon">
                  <FaPhone className="inputIcon" />
                  <input 
                    type="tel" 
                    name="alternateContactNumber" 
                    placeholder="Alternate number" 
                    value={formData.alternateContactNumber} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>
            <div className="formGroup">
              <label>Email Address</label>
              <div className="inputWithIcon">
                <FaEnvelope className="inputIcon" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your email address" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="formGroup">
              <label>Residential Address</label>
              <div className="inputWithIcon">
                <FaHome className="inputIcon" />
                <input 
                  type="text" 
                  name="address" 
                  placeholder="Full address with pincode" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="formSection">
            <h3><FaEnvelope className="sectionIcon" /> Additional Information</h3>
            <div className="formGroup">
              <label>Message (if any)</label>
              <textarea 
                name="message" 
                placeholder="Any special requirements or information you'd like to share..." 
                value={formData.message} 
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="formActions">
            <button 
              type="button" 
              className="secondaryButton"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
            <button 
              type="submit" 
              className="submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="buttonLoader"></span>
              ) : (
                <>
                  <FaPaperPlane className="buttonIcon" />
                  Submit Application
                </>
              )}
            </button>
          </div>

          {status.message && (
            <div className={`formStatus ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Admission;
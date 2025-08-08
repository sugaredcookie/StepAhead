import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaUserGraduate, FaSchool, FaUserTie, FaAddressCard, FaNotesMedical,
  FaMoneyBillWave, FaChevronLeft, FaVenusMars, FaTint, 
  FaCalendarAlt, FaIdBadge, FaPhone, FaEnvelope, FaBriefcase
} from 'react-icons/fa';
import './View.css';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load student');
        const data = await res.json();
        
        // Initialize missing fields
        const studentData = data.data.student;
        if (!studentData.allergies) studentData.allergies = [];
        if (!studentData.medicalConditions) studentData.medicalConditions = [];
        if (!studentData.feeDetails) studentData.feeDetails = { totalFee: 0, paidAmount: 0 };
        if (!studentData.address) studentData.address = { street: '', city: '', state: '', pincode: '' };
        
        setStudent(studentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, token]);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading student data...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>Error Loading Student Data</h2>
      <p>{error}</p>
      <button onClick={() => navigate('/students')} className="btn-back">
        <FaChevronLeft /> Back to Student List
      </button>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="student-view-container">
      <div className="view-header">
        <h2>
          <FaUserGraduate /> Student Details
        </h2>
        <button 
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft /> Back
        </button>
      </div>

      <div className="student-profile">
        {student.photo && (
          <div className="profile-photo">
            <img src={student.photo} alt="Student" />
          </div>
        )}
        <div className="profile-info">
          <h3>{student.fullName}</h3>
          <p>Student ID: {student.studentId}</p>
          <p>Class: {student.classGroup} - Section {student.section}</p>
          <p>Roll Number: {student.rollNumber}</p>
        </div>
      </div>

      <div className="details-sections">
        {/* Basic Information */}
        <div className="detail-section">
          <h3><FaUserGraduate /> Basic Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{formatDate(student.dateOfBirth)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Age:</span>
              <span className="detail-value">{student.age}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label"><FaVenusMars /> Gender:</span>
              <span className="detail-value">{student.gender}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label"><FaTint /> Blood Group:</span>
              <span className="detail-value">{student.bloodGroup || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Admission Date:</span>
              <span className="detail-value">{formatDate(student.admissionDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Academic Year:</span>
              <span className="detail-value">{student.academicYear}</span>
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div className="detail-section">
          <h3><FaUserTie /> Parent Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Parent Name:</span>
              <span className="detail-value">{student.parentName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label"><FaPhone /> Contact:</span>
              <span className="detail-value">{student.parentContact}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label"><FaEnvelope /> Email:</span>
              <span className="detail-value">{student.parentEmail || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label"><FaBriefcase /> Occupation:</span>
              <span className="detail-value">{student.parentOccupation || 'N/A'}</span>
            </div>
          </div>

          <h4><FaAddressCard /> Address</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Street:</span>
              <span className="detail-value">{student.address.street || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">City:</span>
              <span className="detail-value">{student.address.city || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">State:</span>
              <span className="detail-value">{student.address.state || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pincode:</span>
              <span className="detail-value">{student.address.pincode || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        {student.allergies.length > 0 || student.medicalConditions.length > 0 ? (
          <div className="detail-section">
            <h3><FaNotesMedical /> Medical Information</h3>
            <div className="detail-grid">
              {student.allergies.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Allergies:</span>
                  <div className="detail-value">
                    {student.allergies.map((allergy, index) => (
                      <span key={index} className="medical-tag">{allergy}</span>
                    ))}
                  </div>
                </div>
              )}
              {student.medicalConditions.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Medical Conditions:</span>
                  <div className="detail-value">
                    {student.medicalConditions.map((condition, index) => (
                      <span key={index} className="medical-tag">{condition}</span>
                    ))}
                  </div>
                </div>
              )}
              {student.doctorName && (
                <div className="detail-item">
                  <span className="detail-label">Doctor Name:</span>
                  <span className="detail-value">{student.doctorName}</span>
                </div>
              )}
              {student.doctorContact && (
                <div className="detail-item">
                  <span className="detail-label">Doctor Contact:</span>
                  <span className="detail-value">{student.doctorContact}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Fees Information */}
        <div className="detail-section">
          <h3><FaMoneyBillWave /> Fees Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Total Fee:</span>
              <span className="detail-value">₹{student.feeDetails.totalFee.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Paid Amount:</span>
              <span className="detail-value">₹{student.feeDetails.paidAmount.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Balance:</span>
              <span className="detail-value">₹{(student.feeDetails.totalFee - student.feeDetails.paidAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
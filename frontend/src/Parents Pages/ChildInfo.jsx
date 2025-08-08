
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChildInfo.css';

const ChildInfo = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const navigate = useNavigate();

  useEffect(() => {
  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
    }
  };
  checkToken();
}, []);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/students/myChild', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response:', response.data);
        setStudent(response.data.data.student);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch child data');
        setLoading(false);
      }
    };

    fetchChildData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!student) return <div className="not-found">Student not found</div>;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="child-info-container">
      <div className="child-header">
        <div className="child-photo">
          {student.photo ? (
            <img src={student.photo} alt={`${student.fullName}`} />
          ) : (
            <div className="photo-placeholder">No Photo</div>
          )}
        </div>
        <div className="child-basic">
          <h1>{student.fullName}</h1>
          <p>Student ID: {student.studentId}</p>
          <p>Class: {student.classGroup} - Section {student.section}</p>
          <p>Roll Number: {student.rollNumber}</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={activeTab === 'parent' ? 'active' : ''}
          onClick={() => setActiveTab('parent')}
        >
          Parent Info
        </button>
        <button
          className={activeTab === 'medical' ? 'active' : ''}
          onClick={() => setActiveTab('medical')}
        >
          Medical Info
        </button>
        <button
          className={activeTab === 'fees' ? 'active' : ''}
          onClick={() => setActiveTab('fees')}
        >
          Fees Info
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'basic' && (
          <div className="basic-info">
            <h2>Basic Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Date of Birth:</span>
                <span className="info-value">{formatDate(student.dateOfBirth)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">{student.age} years</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender:</span>
                <span className="info-value">{student.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Blood Group:</span>
                <span className="info-value">{student.bloodGroup || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Academic Year:</span>
                <span className="info-value">{student.academicYear}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Admission Date:</span>
                <span className="info-value">{formatDate(student.admissionDate)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parent' && (
          <div className="parent-info">
            <h2>Parent/Guardian Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Parent Name:</span>
                <span className="info-value">{student.parentName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contact Number:</span>
                <span className="info-value">{student.parentContact}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{student.parentEmail || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Occupation:</span>
                <span className="info-value">{student.parentOccupation || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">
                  {student.address ? (
                    `${student.address.street || ''}, ${student.address.city || ''}, 
                    ${student.address.state || ''}, ${student.address.pincode || ''}`
                  ) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="medical-info">
            <h2>Medical Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Allergies:</span>
                <span className="info-value">
                  {student.allergies && student.allergies.length > 0 
                    ? student.allergies.join(', ') 
                    : 'None'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Medical Conditions:</span>
                <span className="info-value">
                  {student.medicalConditions && student.medicalConditions.length > 0 
                    ? student.medicalConditions.join(', ') 
                    : 'None'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Doctor Name:</span>
                <span className="info-value">{student.doctorName || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Doctor Contact:</span>
                <span className="info-value">{student.doctorContact || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="fees-info">
            <h2>Fees Information</h2>
            <div className="fee-summary">
              <div className="info-item">
                <span className="info-label">Total Fee:</span>
                <span className="info-value">₹{student.feeDetails.totalFee.toFixed(2)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Paid Amount:</span>
                <span className="info-value">₹{student.feeDetails.paidAmount.toFixed(2)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Balance Due:</span>
                <span className="info-value">
                  ₹{(student.feeDetails.totalFee - student.feeDetails.paidAmount).toFixed(2)}
                </span>
              </div>
            </div>

            {student.feeDetails.paymentHistory && student.feeDetails.paymentHistory.length > 0 && (
              <div className="payment-history">
                <h3>Payment History</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Mode</th>
                      <th>Receipt No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.feeDetails.paymentHistory.map((payment, index) => (
                      <tr key={index}>
                        <td>{formatDate(payment.paymentDate)}</td>
                        <td>₹{payment.amount.toFixed(2)}</td>
                        <td>{payment.paymentMode}</td>
                        <td>{payment.receiptNumber || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildInfo;
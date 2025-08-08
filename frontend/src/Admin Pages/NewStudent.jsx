import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate, FaSchool, FaUserTie, FaAddressCard, FaNotesMedical,
  FaMoneyBillWave, FaSave, FaTimes, FaChevronLeft, FaPlus, FaImage
} from 'react-icons/fa';
import './NewStudent.css';

const NewStudent = ({ onStudentAdded }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parentVerificationError, setParentVerificationError] = useState(null);
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedicalCondition, setNewMedicalCondition] = useState('');

  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    bloodGroup: '',
    photo: '',
    classGroup: 'Playgroup',
    section: 'A',
    academicYear: `${currentYear}-${currentYear + 1}`,
    admissionDate: new Date().toISOString().split('T')[0],
    rollNumber: '',
    parentId: '',
    parentName: '',
    parentContact: '',
    parentEmail: '',
    parentOccupation: '',
    address: { street: '', city: '', state: '', pincode: '' },
    allergies: [],
    medicalConditions: [],
    doctorName: '',
    doctorContact: '',
    feeDetails: { 
      totalFee: 0,
      paidAmount: 0,
      paymentHistory: [] 
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const handleAddMedicalCondition = () => {
    if (newMedicalCondition.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, newMedicalCondition.trim()]
      }));
      setNewMedicalCondition('');
    }
  };

  const handleRemoveMedicalCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((_, i) => i !== index)
    }));
  };

  const verifyParentId = async () => {
    try {
      setLoading(true);
      setParentVerificationError(null);
      
      if (!formData.parentId) {
        throw new Error('Please enter a parent ID first');
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/${formData.parentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Parent not found');
      }
      
      const parentData = await response.json();
      
      setFormData(prev => ({
        ...prev,
        parentName: parentData.data.user.fullName,
        parentContact: parentData.data.user.phoneNumber,
        parentEmail: parentData.data.user.email,
        parentOccupation: parentData.data.user.occupation || ''
      }));
      
    } catch (error) {
      setParentVerificationError(error.message);
      setFormData(prev => ({
        ...prev,
        parentName: '',
        parentContact: '',
        parentEmail: '',
        parentOccupation: ''
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Calculate age before submission
      if (formData.dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(formData.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        formData.age = age;
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(
          responseData.message || 
          responseData.error || 
          `Request failed with status ${response.status}`
        );
      }
      
      if (onStudentAdded) {
        onStudentAdded(responseData.data.student);
      }
      
      navigate('/studentInfo');
    } catch (error) {
      console.error('Submission Error:', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-detail-section">
      <div className="section-header">
        <h2>
          <FaUserGraduate /> Add New Student
        </h2>
        <button 
          className="btn-back"
          onClick={() => navigate('/studentInfo')}
        >
          <FaChevronLeft /> Back to List
        </button>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="student-form">

        {/* Parent Information Section */}
        <div className="form-section">
          <h3><FaUserTie /> Parent Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Parent ID*:  Paste the generated code here</label>
              <div className="parent-id-container">
                <input
                  type="text"
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="Enter parent's user ID"
                />
              </div>
              {/* <button 
                type="button"
                className="btn-add-parent"
                onClick={() => navigate('/signup')}
              >
                <FaPlus /> Create New Parent
              </button> */}
              {parentVerificationError && (
                <div className="form-error">{parentVerificationError}</div>
              )}
            </div>
            
            <div className="form-group">
              <label>Parent Name*</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Parent Contact*</label>
              <input
                type="tel"
                name="parentContact"
                value={formData.parentContact}
                onChange={handleInputChange}
                required
                disabled={loading}
                pattern="[0-9]{10}"
                placeholder="10 digit phone number"
              />
            </div>
            
            <div className="form-group">
              <label>Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="parent@example.com"
              />
            </div>
            
            <div className="form-group">
              <label>Parent Occupation</label>
              <input
                type="text"
                name="parentOccupation"
                value={formData.parentOccupation}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <h4><FaAddressCard /> Address</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="form-section">
          <h3><FaUserGraduate /> Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID*</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Date of Birth*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="2"
                max="6"
                disabled
              />
            </div>
            
            <div className="form-group">
              <label>Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="form-group">
              <label>Student Photo</label>
              <div className="file-upload">
                <label className="file-upload-label">
                  <FaImage /> {formData.photo ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={loading}
                  />
                </label>
                {formData.photo && (
                  <div className="photo-preview">
                    <img src={formData.photo} alt="Student Preview" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Class Information Section */}
        <div className="form-section">
          <h3><FaSchool /> Class Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Class Group*</label>
              <select
                name="classGroup"
                value={formData.classGroup}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="Level 0">Level 0</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Section*</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Academic Year*</label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="YYYY-YYYY"
              />
            </div>
            
            <div className="form-group">
              <label>Admission Date*</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Roll Number*</label>
              <input
                type="number"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="form-section">
          <h3><FaNotesMedical /> Medical Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Allergies</label>
              <div className="array-input">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  disabled={loading}
                  placeholder="Add allergy"
                />
                <button 
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddAllergy}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
              {formData.allergies.length > 0 && (
                <div className="array-items">
                  {formData.allergies.map((allergy, index) => (
                    <div key={index} className="array-item">
                      {allergy}
                      <button 
                        type="button"
                        onClick={() => handleRemoveAllergy(index)}
                        className="btn-remove-item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Medical Conditions</label>
              <div className="array-input">
                <input
                  type="text"
                  value={newMedicalCondition}
                  onChange={(e) => setNewMedicalCondition(e.target.value)}
                  disabled={loading}
                  placeholder="Add medical condition"
                />
                <button 
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddMedicalCondition}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
              {formData.medicalConditions.length > 0 && (
                <div className="array-items">
                  {formData.medicalConditions.map((condition, index) => (
                    <div key={index} className="array-item">
                      {condition}
                      <button 
                        type="button"
                        onClick={() => handleRemoveMedicalCondition(index)}
                        className="btn-remove-item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Doctor Contact</label>
              <input
                type="text"
                name="doctorContact"
                value={formData.doctorContact}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Doctor's phone number"
              />
            </div>
          </div>
        </div>

        {/* Fees Information Section */}
        <div className="form-section">
          <h3><FaMoneyBillWave /> Fees Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Total Fee (₹)</label>
              <input
                type="number"
                name="feeDetails.totalFee"
                value={formData.feeDetails.totalFee}
                onChange={handleInputChange}
                disabled={loading}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Paid Amount (₹)</label>
              <input
                type="number"
                name="feeDetails.paidAmount"
                value={formData.feeDetails.paidAmount}
                onChange={handleInputChange}
                disabled={loading}
                min="0"
              />
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-small"></div> Saving...
              </>
            ) : (
              <>
                <FaSave /> Save
              </>
            )}
          </button>
          <button 
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/studentInfo')}
            disabled={loading}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewStudent;
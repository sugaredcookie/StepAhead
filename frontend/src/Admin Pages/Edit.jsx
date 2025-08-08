import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaUserGraduate, FaSchool, FaUserTie, FaAddressCard, FaNotesMedical,
  FaMoneyBillWave, FaSave, FaTimes, FaChevronLeft, FaPlus, FaImage,
  FaVenusMars, FaTint, FaCalendarAlt, FaIdBadge
} from 'react-icons/fa';
import './Edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedicalCondition, setNewMedicalCondition] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudent = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/students/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to load student');
            }
            
            const data = await res.json();
            
            // Ensure the student data is properly initialized
            const studentData = data.data.student;
            
            // Initialize arrays if they don't exist
            if (!studentData.allergies) studentData.allergies = [];
            if (!studentData.medicalConditions) studentData.medicalConditions = [];
            if (!studentData.feeDetails) {
            studentData.feeDetails = {
                totalFee: 0,
                paidAmount: 0,
                paymentHistory: []
            };
            }
            if (!studentData.address) {
            studentData.address = {
                street: '',
                city: '',
                state: '',
                pincode: ''
            };
            }
            
            setStudent(studentData);
        } catch (err) {
            setError(err.message);
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
        };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setStudent({ 
        ...student, 
        [parent]: { ...student[parent], [child]: value } 
      });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({ ...student, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setStudent({ 
        ...student, 
        allergies: [...student.allergies, newAllergy.trim()] 
      });
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index) => {
    setStudent({ 
      ...student, 
      allergies: student.allergies.filter((_, i) => i !== index) 
    });
  };

  const handleAddMedicalCondition = () => {
    if (newMedicalCondition.trim()) {
      setStudent({ 
        ...student, 
        medicalConditions: [...student.medicalConditions, newMedicalCondition.trim()] 
      });
      setNewMedicalCondition('');
    }
  };

  const handleRemoveMedicalCondition = (index) => {
    setStudent({ 
      ...student, 
      medicalConditions: student.medicalConditions.filter((_, i) => i !== index) 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(student),
      });

      if (!res.ok) throw new Error('Update failed');
      alert('Student updated successfully!');
      navigate('/studentInfo');
    } catch (err) {
      setError(err.message);
    }
  };

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
      <button onClick={() => navigate('/studentInfo')} className="btn-back">
        <FaChevronLeft /> Back to Student List
      </button>
    </div>
  );

  return (
    <div className="student-detail-section">
      <div className="section-header">
        <h2>
          <FaUserGraduate /> Edit Student
        </h2>
        <button 
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft /> Back
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="student-form">
        {/* Parent Information Section */}
        <div className="form-section">
          <h3><FaUserTie /> Parent Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Parent ID</label>
              <input
                type="text"
                name="parentId"
                value={student.parentId || ''}
                onChange={handleChange}
                disabled
              />
            </div>
            
            <div className="form-group">
              <label>Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={student.parentName || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Parent Contact</label>
              <input
                type="tel"
                name="parentContact"
                value={student.parentContact || ''}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                placeholder="10 digit phone number"
              />
            </div>
            
            <div className="form-group">
              <label>Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                value={student.parentEmail || ''}
                onChange={handleChange}
                placeholder="parent@example.com"
              />
            </div>
            
            <div className="form-group">
              <label>Parent Occupation</label>
              <input
                type="text"
                name="parentOccupation"
                value={student.parentOccupation || ''}
                onChange={handleChange}
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
                value={student.address?.street || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={student.address?.city || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                value={student.address?.state || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="address.pincode"
                value={student.address?.pincode || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Student Information Section */}
        <div className="form-section">
          <h3><FaUserGraduate /> Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={student.studentId || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={student.fullName || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label><FaCalendarAlt /> Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={student.age || ''}
                onChange={handleChange}
                min="2"
                max="6"
                disabled
              />
            </div>
            
            <div className="form-group">
              <label><FaVenusMars /> Gender</label>
              <select
                name="gender"
                value={student.gender || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label><FaTint /> Blood Group</label>
              <select
                name="bloodGroup"
                value={student.bloodGroup || ''}
                onChange={handleChange}
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
                  <FaImage /> {student.photo ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {student.photo && (
                  <div className="photo-preview">
                    <img src={student.photo} alt="Student Preview" />
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
              <label>Class Group</label>
              <select
                name="classGroup"
                value={student.classGroup || ''}
                onChange={handleChange}
                required
              >
                <option value="Level 0">Level 0</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Section</label>
              <select
                name="section"
                value={student.section || ''}
                onChange={handleChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Academic Year</label>
              <input
                type="text"
                name="academicYear"
                value={student.academicYear || ''}
                onChange={handleChange}
                required
                placeholder="YYYY-YYYY"
              />
            </div>
            
            <div className="form-group">
              <label>Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={student.admissionDate ? new Date(student.admissionDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label><FaIdBadge /> Roll Number</label>
              <input
                type="number"
                name="rollNumber"
                value={student.rollNumber || ''}
                onChange={handleChange}
                required
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
                  placeholder="Add allergy"
                />
                <button 
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddAllergy}
                >
                  Add
                </button>
              </div>
              {student.allergies?.length > 0 && (
                <div className="array-items">
                  {student.allergies.map((allergy, index) => (
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
                  placeholder="Add medical condition"
                />
                <button 
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddMedicalCondition}
                >
                  Add
                </button>
              </div>
              {student.medicalConditions?.length > 0 && (
                <div className="array-items">
                  {student.medicalConditions.map((condition, index) => (
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
                value={student.doctorName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Doctor Contact</label>
              <input
                type="text"
                name="doctorContact"
                value={student.doctorContact || ''}
                onChange={handleChange}
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
                value={student.feeDetails?.totalFee || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Paid Amount (₹)</label>
              <input
                type="number"
                name="feeDetails.paidAmount"
                value={student.feeDetails?.paidAmount || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save">
            <FaSave /> Save Changes
          </button>
          <button 
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/students')}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
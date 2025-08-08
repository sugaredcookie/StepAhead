import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate, FaSearch, FaEye, FaEdit, FaTrash, FaPlus,
  FaChevronLeft, FaChevronRight, FaArrowLeft
} from 'react-icons/fa';
import './StudentInfo.css';

const StudentInfo = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const studentsPerPage = 5;

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data.data.students);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Handle search and pagination
  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // View student details
  const handleViewStudent = (student) => {
    navigate(`/view/${student._id}`);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete student');
      
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="student-management-container">
      <div className="student-list-section">
        <div className="top-navigation">
          <button 
            className="btn-back-dashboard"
            onClick={() => navigate('/adminDashboard')}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
        
        <div className="section-header">
          <h2><FaUserGraduate /> Student Management</h2>
          <button 
            className="btn-add" 
            onClick={() => navigate('/signup')}
          >
            <FaPlus /> Add New Student
          </button>
        </div>
        
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : (
          <>
            <div className="student-table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map(student => (
                      <tr key={student._id}>
                        <td>{student.studentId}</td>
                        <td>{student.fullName}</td>
                        <td>{student.classGroup} - {student.section}</td>
                        <td>
                          {student.parentId?.fullName || 'N/A'}
                          {student.parentId?.phoneNumber && ` (${student.parentId.phoneNumber})`}
                        </td>
                        <td>{student.parentContact}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-view"
                            onClick={() => handleViewStudent(student)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn-edit"
                            onClick={() => navigate(`/edit/${student._id}`)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDelete(student._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-results">
                        No students found matching your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredStudents.length > studentsPerPage && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
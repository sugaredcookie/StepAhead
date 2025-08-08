import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData'));

  // No token - redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    // Verify token is valid and not expired
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Token expired
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user exists and has admin role
    if (!userData || userData.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (error) {
    console.error('Token verification failed:', error);
    // Clear invalid token and redirect
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
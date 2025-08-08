import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  // Get token and role from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;

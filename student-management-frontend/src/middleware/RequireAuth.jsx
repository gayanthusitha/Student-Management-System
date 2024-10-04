// src/middleware/RequireAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Role checks
  if (role === 'admin' && userRole !== 'admin') {
    return <Navigate to="/super-admin-dashboard" />; // Redirect to super-admin dashboard if not an admin
  }

  if (role === 'superadmin' && userRole !== 'superadmin') {
    return <Navigate to="/admin-dashboard" />; // Redirect to admin dashboard if not a superadmin
  }

  return children; // Render children if authenticated and has the correct role
};

export default RequireAuth;

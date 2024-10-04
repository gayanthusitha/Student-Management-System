// src/middleware/RedirectIfLoggedIn.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfLoggedIn = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Redirect to the appropriate dashboard if already authenticated
    const role = localStorage.getItem('role');
    return <Navigate to={role === 'superadmin' ? '/super-admin-dashboard' : '/admin-dashboard'} />;
  }

  return children; // Render children if not authenticated
};

export default RedirectIfLoggedIn;

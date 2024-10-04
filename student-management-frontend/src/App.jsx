// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import RequireAuth from './middleware/RequireAuth';
import RedirectIfLoggedIn from './middleware/RedirectIfLoggedIn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <RequireAuth role="admin">
              <AdminDashboard />
            </RequireAuth>
          } 
        />
        <Route 
          path="/super-admin-dashboard" 
          element={
            <RequireAuth role="superadmin">
              <SuperAdminDashboard />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;

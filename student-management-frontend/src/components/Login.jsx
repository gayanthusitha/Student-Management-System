// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and role in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Save user role

        // Redirect based on role
        if (data.role === 'superadmin') {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="********"
          />
        </div>
        <button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200 w-full">
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

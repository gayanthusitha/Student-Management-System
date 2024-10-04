import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'admin', // Default role can be 'admin', change as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add admin.');
      }

      alert('Admin added successfully!');
      setFormData({
        full_name: '',
        email: '',
        password: '',
        role: 'admin',
      });

    } catch (error) {
      console.error('Error adding admin:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaUser /></span>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaEnvelope /></span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaLock /></span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaUserShield /></span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              >
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-4 rounded-lg font-semibold mt-8 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;

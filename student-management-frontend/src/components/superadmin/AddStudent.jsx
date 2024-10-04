import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'Male',
    date_of_birth: '',
    contact_number: '',
    email: '',
    subject: '',
    registration_fee: '',
  });

  useEffect(() => {
    const generatedNumber = 1; 
    setFormData(prevState => ({
      ...prevState,
      registration_number: generatedNumber,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/students/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
        },
        body: JSON.stringify(formData),
      });

      // Check if response is OK
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to get error details
        throw new Error(errorData.message || 'Failed to add student.');
      }

      // If successful, clear the form and alert the user
      alert('Student added successfully!');
      setFormData({
        full_name: '',
        gender: 'Male',
        date_of_birth: '',
        contact_number: '',
        email: '',
        subject: '',
        registration_fee: '',
      });
      
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred: ' + error.message); // Display the error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaUser /></span>
              <input
                type="text"
                value="Auto-generated"
                readOnly
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
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
              <span className="p-3 text-gray-500"><FaUser /></span>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaCalendarAlt /></span>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaPhone /></span>
              <input
                type="tel"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
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
              <span className="p-3 text-gray-500"><FaUser /></span>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaMoneyBillWave /></span>
              <input
                type="number"
                name="registration_fee"
                placeholder="Registration Fee"
                value={formData.registration_fee}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-4 rounded-lg font-semibold mt-8 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

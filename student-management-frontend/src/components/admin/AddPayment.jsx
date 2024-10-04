import React, { useState, useEffect } from 'react';
import { FaUser, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const AddPayment = () => {
  const [formData, setFormData] = useState({
    registration_number: '',
    month: '',
    price: '',
    status: 'Paid', 
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

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
      const response = await fetch('http://localhost:5000/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
        },
        body: JSON.stringify(formData),
      });

      let result;

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text(); // Read the response as plain text
        result = { message: text }; // Create an object to contain the message
      }

      // Log response status and result
      console.log('Response Status:', response.status); // Log the response status
      console.log('Response Result:', result); // Log the response body

      if (response.ok) {
        alert('Payment added successfully');
        // Clear the form or handle the successful submission
        setFormData({
          registration_number: '',
          month: '',
          price: '',
          status: 'Paid', // Reset status to 'Paid'
        });
      } else {
        // Show specific error message
        alert(`Failed to add payment: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Error adding payment: ' + error.message); // Display a more informative error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Add Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaUser /></span>
              <select
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
                required
              >
                <option value="" disabled>Select Registration Number</option>
                {students.map(student => (
                  <option key={student.id} value={student.registration_number}>
                    {student.registration_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaCalendarAlt /></span>
              <input
                type="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaMoneyBillWave /></span>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
              <span className="p-3 text-gray-500"><FaMoneyBillWave /></span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 text-gray-700 border-none focus:ring-2 focus:ring-blue-400 rounded-r-lg"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold mt-8 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
          >
            Add Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;

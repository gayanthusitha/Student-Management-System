import React, { useState } from 'react';
import { FaUser, FaDollarSign, FaList, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Sidebar = ({ setActiveComponent }) => {
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleLogout = () => {
    // Logic for logging out
    localStorage.removeItem('token'); // Example logic
    // Redirect to login page or handle logout
  };

  return (
    <div className="bg-blue-900 text-white w-64 h-screen flex flex-col justify-between p-6 shadow-lg">
      <div>
        <h2 className="text-2xl font-semibold mb-8 text-center border-b-2 border-blue-700 pb-2">Admin Panel</h2>
        
        <ul className="space-y-4">
          {/* Student Dropdown */}
          <li>
            <div 
              className="flex justify-between items-center cursor-pointer hover:bg-blue-800 p-3 rounded-md transition duration-200"
              onClick={() => setIsStudentOpen(!isStudentOpen)}
            >
              <div className="flex items-center">
                <FaUser className="mr-3 text-lg" />
                <span className="font-medium text-lg">Student</span>
              </div>
              {isStudentOpen ? <AiFillCaretUp className="text-lg" /> : <AiFillCaretDown className="text-lg" />}
            </div>
            {isStudentOpen && (
              <ul className="ml-4 space-y-2">
                <li 
                  onClick={() => setActiveComponent('StudentList')} 
                  className="flex items-center cursor-pointer hover:bg-blue-800 p-2 rounded-md transition duration-200"
                >
                  <FaList className="mr-3" />
                  <span className="text-sm">Student List</span>
                </li>
                <li 
                  onClick={() => setActiveComponent('AddStudent')} 
                  className="flex items-center cursor-pointer hover:bg-blue-800 p-2 rounded-md transition duration-200"
                >
                  <FaPlus className="mr-3" />
                  <span className="text-sm">Add Student</span>
                </li>
              </ul>
            )}
          </li>

          {/* Separator */}
          <hr className="border-gray-600 my-2" />

          {/* Payment Dropdown */}
          <li>
            <div 
              className="flex justify-between items-center cursor-pointer hover:bg-blue-800 p-3 rounded-md transition duration-200"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <div className="flex items-center">
                <FaDollarSign className="mr-3 text-lg" />
                <span className="font-medium text-lg">Payment</span>
              </div>
              {isPaymentOpen ? <AiFillCaretUp className="text-lg" /> : <AiFillCaretDown className="text-lg" />}
            </div>
            {isPaymentOpen && (
              <ul className="ml-4 space-y-2">
                <li 
                  onClick={() => setActiveComponent('PaymentList')} 
                  className="flex items-center cursor-pointer hover:bg-blue-800 p-2 rounded-md transition duration-200"
                >
                  <FaList className="mr-3" />
                  <span className="text-sm">Payment List</span>
                </li>
                <li 
                  onClick={() => setActiveComponent('AddPayment')} 
                  className="flex items-center cursor-pointer hover:bg-blue-800 p-2 rounded-md transition duration-200"
                >
                  <FaPlus className="mr-3" />
                  <span className="text-sm">Add Payment</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Logout Button at the bottom */}
      <div>
        <div 
          className="flex items-center cursor-pointer hover:bg-red-600 p-3 rounded-md transition duration-200 mt-4"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-3 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { FaUser, FaDollarSign, FaList, FaPlus, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Sidebar = ({ setActiveComponent, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden flex items-center bg-gray-900 p-4 text-white">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl focus:outline-none"
        >
          {isSidebarOpen ? '✖' : '☰'}
        </button>
        <h2 className="ml-4 text-xl font-semibold">SuperAdmin Panel</h2>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 lg:z-auto top-0 left-0 h-full lg:h-screen w-64 bg-gray-900 text-white flex flex-col justify-between p-6 shadow-lg transition-transform transform lg:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center border-b-2 border-white pb-2">
            SuperAdmin Panel
          </h2>
          <ul className="space-y-4">
            {/* Student Dropdown */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-500 p-3 rounded-md transition duration-200"
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
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaList className="mr-3" />
                    <span className="text-sm">Student List</span>
                  </li>
                  <li
                    onClick={() => setActiveComponent('AddStudent')}
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaPlus className="mr-3" />
                    <span className="text-sm">Add Student</span>
                  </li>
                </ul>
              )}
            </li>

            <hr className="border-gray-600 my-2" />

            {/* Payment Dropdown */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-500 p-3 rounded-md transition duration-200"
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
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaList className="mr-3" />
                    <span className="text-sm">Payment List</span>
                  </li>
                  <li
                    onClick={() => setActiveComponent('AddPayment')}
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaPlus className="mr-3" />
                    <span className="text-sm">Add Payment</span>
                  </li>
                </ul>
              )}
            </li>

            <hr className="border-gray-600 my-2" />

            {/* Admin Dropdown */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-500 p-3 rounded-md transition duration-200"
                onClick={() => setIsAdminOpen(!isAdminOpen)}
              >
                <div className="flex items-center">
                  <FaUserShield className="mr-3 text-lg" />
                  <span className="font-medium text-lg">Admin</span>
                </div>
                {isAdminOpen ? <AiFillCaretUp className="text-lg" /> : <AiFillCaretDown className="text-lg" />}
              </div>
              {isAdminOpen && (
                <ul className="ml-4 space-y-2">
                  <li
                    onClick={() => setActiveComponent('AdminList')}
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaList className="mr-3" />
                    <span className="text-sm">Admin List</span>
                  </li>
                  <li
                    onClick={() => setActiveComponent('AddAdmin')}
                    className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded-md transition duration-200"
                  >
                    <FaPlus className="mr-3" />
                    <span className="text-sm">Add Admin</span>
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
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when the sidebar is open */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
};

export default Sidebar;

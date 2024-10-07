import React, { useState, useEffect } from 'react';
import Sidebar from '../superadmin/Sidebar';
import PaymentList from '../superadmin/PaymentList';
import AddPayment from '../superadmin/AddPayment';
import StudentList from '../superadmin/StudentList';
import AddStudent from '../superadmin/AddStudent';
import AdminList from '../superadmin/AdminList';
import AddAdmin from './AddAdmin';
import { AiOutlineLogout } from 'react-icons/ai';

const SuperAdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    const timer = setTimeout(() => {
      setActiveComponent('StudentList');
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'StudentList':
        return <StudentList />;
      case 'AddStudent':
        return <AddStudent />;
      case 'PaymentList':
        return <PaymentList />;
      case 'AddPayment':
        return <AddPayment />;
      case 'AdminList':
        return <AdminList />;
      case 'AddAdmin':
        return <AddAdmin />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <Sidebar setActiveComponent={setActiveComponent} handleLogout={handleLogout} />
      <div className="flex-grow flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-black shadow-md py-3 px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center">
            <h1 className="text-md sm:text-xl font-semibold text-white">Super-Admin Dashboard</h1>
            <div className="ml-0 sm:ml-4 text-sm text-gray-600">
              {username && <span>Welcome, {username}</span>}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0">
            <span className="mb-2 sm:mb-0 sm:mr-4 text-sm text-white">{currentDateTime}</span>
            <button 
              onClick={handleLogout} 
              className="flex items-center bg-red-600 text-white px-3 py-1.5 text-xs rounded-md hover:bg-red-500 transition duration-200"
            >
              <AiOutlineLogout className="mr-2 text-base" />
              Logout
            </button>
          </div>
        </nav>
        <div className="flex-grow p-4 sm:p-6 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-10 w-10 border-4 border-yellow-400 border-dashed rounded-full"></div>
            </div>
          ) : (
            renderComponent()
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

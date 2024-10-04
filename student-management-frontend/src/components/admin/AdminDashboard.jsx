import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import PaymentList from './PaymentList';
import AddPayment from './AddPayment';
import StudentList from './StudentList';
import AddStudent from './AddStudent';
import { AiOutlineLogout } from 'react-icons/ai';

const AdminDashboard = () => {
  const location = useLocation(); // Get the current route
  const [activeComponent, setActiveComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Get current date and time
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateDateTime(); // Set initial date and time
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    // Set the active component based on the current route
    switch (location.pathname) {
      case '/admin/student-list':
        setActiveComponent('StudentList');
        break;
      case '/admin/add-student':
        setActiveComponent('AddStudent');
        break;
      case '/admin/payment-list':
        setActiveComponent('PaymentList');
        break;
      case '/admin/add-payment':
        setActiveComponent('AddPayment');
        break;
      default:
        setActiveComponent('StudentList'); // Default to StudentList if no route matches
        break;
    }
    setIsLoading(false); // Hide loading animation

    return () => {
      clearInterval(intervalId); // Cleanup interval
    };
  }, [location.pathname]); // Re-run when the route changes

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
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Optional: Remove user data if stored
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveComponent={setActiveComponent} handleLogout={handleLogout} />
      <div className="flex-grow flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="ml-4 text-gray-600">
              {/* Optional: Display username if needed */}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">{currentDateTime}</span>
            <button 
              onClick={handleLogout} 
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
            >
              <AiOutlineLogout className="mr-2" />
              Logout
            </button>
          </div>
        </nav>
        <div className="flex-grow p-6 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              {/* Loading Animation */}
              <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-dashed rounded-full"></div>
            </div>
          ) : (
            renderComponent()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

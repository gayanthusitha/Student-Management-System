import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    // Add a delay to show the hero section with animation
    setTimeout(() => {
      setIsHeroVisible(true);
    }, 300);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center py-6 px-8 sm:px-16 md:px-24 lg:px-32">
        <h1 className="text-3xl md:text-4xl font-bold text-center sm:text-left tracking-wider">
          Student Management System
        </h1>
        <div className="sm:hidden mt-4 sm:mt-0">
          <button
            className="text-yellow-400 focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {/* Navbar links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-8 text-base md:text-lg`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <li>
              <a
                href="#features"
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out font-medium text-sm"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Animation */}
      <section
        className={`flex flex-col items-center justify-center text-center py-16 px-6 sm:px-12 md:px-24 lg:px-32 transition-all duration-1000 ease-in-out ${
          isHeroVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight transform transition-transform duration-1000 ease-in-out hover:scale-105">
          Manage Students{" "}
          <span className="text-yellow-400 animate-pulse">Effortlessly</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl text-gray-200 leading-relaxed">
          A robust platform enabling Super Admins and Admins to efficiently
          handle student data, payments, and more.
        </p>
        <a
          href="/login"
          className="bg-yellow-400 text-blue-900 font-semibold text-sm md:text-base px-6 py-2 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-gray-100 text-blue-900 py-12 px-6 sm:px-12 md:px-24 lg:px-32"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4 shadow-lg bg-white rounded-lg transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3 shadow-md">
              <span className="text-2xl font-bold">👨‍🎓</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Student Management</h4>
            <p className="text-gray-700 text-sm">
              Manage student records seamlessly with user-friendly forms and
              robust data handling.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 shadow-lg bg-white rounded-lg transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center mb-3 shadow-md">
              <span className="text-2xl font-bold">💰</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Payment Handling</h4>
            <p className="text-gray-700 text-sm">
              Efficiently track and process payments, ensuring accuracy and
              clarity at every step.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 shadow-lg bg-white rounded-lg transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-3 shadow-md">
              <span className="text-2xl font-bold">📊</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Admin Dashboards</h4>
            <p className="text-gray-700 text-sm">
              Intuitive dashboards tailored for Super Admins and Admins with
              role-specific access.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        id="contact"
        className="bg-blue-900 text-gray-200 py-10 text-center"
      >
        <p className="text-base">&copy; 2024 Student Management System</p>
        <p className="mt-2">
          Contact us at{" "}
          <a
            href="mailto:support@sms.com"
            className="text-yellow-400 hover:underline"
          >
            infod.gayanthusith@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

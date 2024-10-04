import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // You can install this package using npm install date-fns

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Adjust the number of students per page

  // Fetch students from the backend
  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data); // Assuming data contains an array of students
      } else {
        alert('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { registration_number, full_name, gender, date_of_birth, contact_number, email, subject, registration_fee } = selectedStudent;

    try {
      const response = await fetch(`http://localhost:5000/students/${registration_number}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, gender, date_of_birth, contact_number, email, subject, registration_fee }),
      });

      if (response.ok) {
        alert('Student updated successfully');
        fetchStudents(); // Refresh student list after update
        handleCloseModal();
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white text-sm leading-normal">
              <th className="py-3 px-6 text-left">Reg No.</th>
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Date of Birth</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Subject</th>
              <th className="py-3 px-6 text-left">Registration Fee</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentStudents.map((student) => (
              <tr key={student.registration_number} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{student.registration_number}</td>
                <td className="py-3 px-6 text-left">{student.full_name}</td>
                <td className="py-3 px-6 text-left">{student.gender}</td>
                <td className="py-3 px-6 text-left">{format(new Date(student.date_of_birth), 'MM/dd/yyyy')}</td>
                <td className="py-3 px-6 text-left">{student.contact_number}</td>
                <td className="py-3 px-6 text-left">{student.email}</td>
                <td className="py-3 px-6 text-left">{student.subject}</td>
                <td className="py-3 px-6 text-left">{student.registration_fee}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleUpdateClick(student)}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-20">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)} 
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)} 
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Next
        </button>
      </div>

      {/* Update Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3 text-center">Update Student</h3>
            <form onSubmit={handleUpdateStudent}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
                    value={selectedStudent.full_name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, full_name: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600">Gender</label>
                  <select
                    value={selectedStudent.gender}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                  <input
                    type="date"
                    value={selectedStudent.date_of_birth}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, date_of_birth: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">Contact</label>
                  <input
                    type="text"
                    value={selectedStudent.contact_number}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, contact_number: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    value={selectedStudent.email}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">Subject</label>
                  <input
                    type="text"
                    value={selectedStudent.subject}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, subject: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">Registration Fee</label>
                  <input
                    type="number"
                    value={selectedStudent.registration_fee}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, registration_fee: e.target.value })}
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;

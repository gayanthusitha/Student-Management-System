import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch students from the backend
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } else {
        alert("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Handle searching and filtering students
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const filtered = students.filter((student) => {
          return (
            student.full_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            student.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.subject.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredStudents(filtered);
      } else {
        setFilteredStudents(students); // Reset to original list if search term is empty
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, students]);

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const {
      registration_number,
      full_name,
      gender,
      date_of_birth,
      contact_number,
      email,
      subject,
      registration_fee,
    } = selectedStudent;

    try {
      const response = await fetch(
        `http://localhost:5000/students/${registration_number}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name,
            gender,
            date_of_birth,
            contact_number,
            email,
            subject,
            registration_fee,
          }),
        }
      );

      if (response.ok) {
        alert("Student updated successfully");
        fetchStudents();
        handleCloseModal();
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, gender, or subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-green-500 rounded-md shadow-md py-2 px-3 w-full"
        />
      </div>

      {/* Responsive Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStudents.map((student) => (
          <div
            key={student.registration_number}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{student.full_name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Reg No:</strong> {student.registration_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Gender:</strong> {student.gender}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date of Birth:</strong>{" "}
              {format(new Date(student.date_of_birth), "MM/dd/yyyy")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong> {student.contact_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {student.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Subject:</strong> {student.subject}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Registration Fee:</strong> {student.registration_fee}
            </p>

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdateClick(student)}
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
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
            <h3 className="text-lg font-semibold mb-3 text-center">
              Update Student
            </h3>
            <form onSubmit={handleUpdateStudent}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={selectedStudent.full_name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        full_name: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Gender
                  </label>
                  <select
                    value={selectedStudent.gender}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        gender: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={selectedStudent.date_of_birth}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        date_of_birth: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Contact
                  </label>
                  <input
                    type="text"
                    value={selectedStudent.contact_number}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        contact_number: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        email: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={selectedStudent.subject}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        subject: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Registration Fee
                  </label>
                  <input
                    type="number"
                    value={selectedStudent.registration_fee}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        registration_fee: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-700 transition duration-200"
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

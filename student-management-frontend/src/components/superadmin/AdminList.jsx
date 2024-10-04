import React, { useState, useEffect } from "react";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(5); // Adjust the number of admins per page

  // Fetch admins from the backend
  const fetchAdmins = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data); // Assuming data contains an array of admins
      } else {
        alert("Failed to fetch admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleDeleteClick = async (adminId) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/${adminId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Admin deleted successfully");
          fetchAdmins(); // Refresh the admin list after deletion
        } else {
          alert("Failed to delete admin");
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedAdmin(null);
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { id, full_name, email, password, role } = selectedAdmin;

    try {
      const response = await fetch(
        `http://localhost:5000/admin/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name,
            email,
            password,
            role,
          }),
        }
      );

      if (response.ok) {
        alert("Admin updated successfully");
        fetchAdmins(); // Refresh admin list after update
        handleCloseModal();
      } else {
        alert("Failed to update admin");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  // Pagination Logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const totalPages = Math.ceil(admins.length / adminsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentAdmins.map((admin) => (
          <div key={admin.id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold">{admin.full_name}</h3>
            <p className="text-gray-600">Email: {admin.email}</p>
            <p className="text-gray-600">Role: {admin.role}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdateClick(admin)}
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(admin.id)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
      {selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Update Admin
            </h3>
            <form onSubmit={handleUpdateAdmin}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={selectedAdmin.full_name}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedAdmin.email}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={selectedAdmin.password}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={selectedAdmin.role}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      role: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200 mr-2"
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

export default AdminList;

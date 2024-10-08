import React, { useEffect, useState } from "react";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [updateData, setUpdateData] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(5); // Change this to set how many payments to show per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch payments when the component mounts
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/payments/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    // Handle searching and filtering payments
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const filtered = payments.filter((payment) => {
          return (
            payment.registration_number.toString().includes(searchTerm) ||
            payment.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredPayments(filtered);
      } else {
        setFilteredPayments(payments); // Reset to original list if search term is empty
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, payments]);

  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setUpdateData({ ...payment });
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/payments/${selectedPayment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Refresh payment list after updating
        const updatedPayments = payments.map((payment) =>
          payment.id === selectedPayment.id ? updateData : payment
        );
        setPayments(updatedPayments);
        handleCloseModal();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Update failed");
    }
  };

  // Pagination Logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Registration Number or Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-green-500 rounded-md shadow-md py-2 px-3 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">
              Payment ID: {payment.id}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Reg No:</strong> {payment.registration_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Month:</strong> {payment.month}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price:</strong> {payment.price}
            </p>
            <p
              className={`text-sm font-semibold ${
                payment.status === "Paid" ? "text-green-600" : "text-red-600"
              }`}
            >
              <strong>Status:</strong> {payment.status}
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleUpdateClick(payment)}
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition duration-200"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
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
      {selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Update Payment
            </h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Month
                </label>
                <input
                  type="text"
                  name="month"
                  value={updateData.month}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={updateData.price}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  name="status"
                  value={updateData.status}
                  onChange={handleUpdateChange}
                  className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200 mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentList;

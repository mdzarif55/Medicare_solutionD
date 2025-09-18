import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const SellerTests = () => {
  const { axios, currency } = useAppContext();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // 🔹 fetch all bookings
  useEffect(() => {
    const fetchAllTests = async () => {
      try {
        const { data } = await axios.get("/api/test/all", {
          withCredentials: true,
        });
        if (data.success) {
          setTests(data.tests);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTests();
  }, [axios]);

  // 🔹 update status
  const updateStatus = async (testId, status) => {
    try {
      const { data } = await axios.post(
        "/api/test/update-status",
        { testId, status },
        { withCredentials: true }
      );
      if (data.success) {
        setTests((prev) =>
          prev.map((t) => (t._id === testId ? { ...t, status } : t))
        );
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return <p className="mt-20 text-center text-lg">Loading test bookings...</p>;
  }

  // 🔹 Filtered list
  const filteredTests =
    filter === "All" ? tests : tests.filter((t) => t.status === filter);

  return (
    <div className="mt-16 max-w-7xl mx-auto px-6 pb-20">
      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Medical Test Bookings</h1>
        <p className="text-gray-500 mt-1">
          Manage all test bookings placed by users. Update status and track payments.
        </p>
      </header>

      {/* Filter controls */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-2">
          {["All", "Scheduled", "Processing", "Completed", "Cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full border text-sm ${
                filter === s
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Showing {filteredTests.length} {filter !== "All" ? filter : ""} bookings
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Slot</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((t, idx) => (
              <tr
                key={t._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {t._id}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{t.user?.name}</div>
                  <div className="text-xs text-gray-500">{t.user?.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{t.testName}</div>
                  <div className="text-xs text-gray-500">৳{t.fees}</div>
                </td>
                <td className="px-4 py-3">
                  {new Date(t.date).toLocaleDateString()} <br />
                  <span className="text-xs text-gray-500">{t.time}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : t.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : t.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-medium ${
                      t.isPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.isPaid ? "Paid" : "Pending"}
                  </span>
                  <div className="text-xs text-gray-500">{t.paymentType}</div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => updateStatus(t._id, "Processing")}
                      className="px-3 py-1.5 text-xs rounded border border-yellow-400 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                    >
                      Processing
                    </button>
                    <button
                      onClick={() => updateStatus(t._id, "Completed")}
                      className="px-3 py-1.5 text-xs rounded border border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => updateStatus(t._id, "Cancelled")}
                      className="px-3 py-1.5 text-xs rounded border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTests.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTests;

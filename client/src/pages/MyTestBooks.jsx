import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyTestBooks = () => {
  const { currency, axios } = useAppContext();
  const navigate = useNavigate();

  const [myTests, setMyTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch from backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get("/api/test/my-tests", {
          withCredentials: true,
        });
        if (data.success) {
          setMyTests(data.tests);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [axios]);

  // 🔹 Pay Online
  const payOnline = async (test) => {
    try {
      const { data } = await axios.post(
        "/api/test/pay",
        { testId: test._id },
        { withCredentials: true }
      );
      if (data.success) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // 🔹 Cancel test booking
  const cancelTest = async (testId) => {
    try {
      const { data } = await axios.post(
        "/api/test/cancel",
        { id: testId },
        { withCredentials: true }
      );
      if (data.success) {
        setMyTests((prev) => prev.filter((t) => t._id !== testId));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p className="mt-16 text-center">Loading...</p>;

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Test Bookings</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myTests.map((test) => (
        <div
          key={test._id}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>Booking ID : {test._id}</span>
            <span>Payment : {test.paymentType}</span>
            <span>
              Total Amount : {currency}
              {test.fees ?? 0}
            </span>
          </p>

          <div className="relative bg-white text-gray-500/70 border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl">
            {/* Test Info */}
            <div className="flex flex-col mb-4 md:mb-0">
              <h2 className="text-xl font-medium text-gray-800">
                {test.testName}
              </h2>
              <p>Date : {new Date(test.date).toLocaleDateString()}</p>
              <p>Time : {test.time}</p>
            </div>

            {/* Status */}
            <div className="flex flex-col justify-center mb-4 md:mb-0">
              <p>Status : {test.status}</p>
              <p>Booked At : {new Date(test.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Amount + actions */}
            <div className="flex flex-col items-end gap-2">
              <p>
                Amount : {currency} {test.fees}
              </p>
              <div className="flex flex-col gap-2 justify-end">
                {!test.isPaid && (
                  <button
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => payOnline(test)}
                    type="button"
                  >
                    Pay Online
                  </button>
                )}
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => cancelTest(test._id)}
                  type="button"
                >
                  Cancel Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {myTests.length === 0 && (
        <p className="text-sm text-gray-500">No test bookings yet.</p>
      )}
    </div>
  );
};

export default MyTestBooks;

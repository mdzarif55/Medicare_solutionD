import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const { currency, axios } = useAppContext();
  const navigate = useNavigate();

  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("/api/appointment/my", {
          withCredentials: true,
        });
        if (data.success) {
          setMyAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [axios]);

  // ✅ Pay Online
  const payOnline = async (apt) => {
    try {
      const { data } = await axios.post(
        "/api/appointment/pay",
        { appointmentId: apt._id },
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

  // ✅ Cancel appointment
  const cancelAppointment = async (aptId) => {
    try {
      const { data } = await axios.post(
        "/api/appointment/cancel",
        { id: aptId },
        { withCredentials: true }
      );
      if (data.success) {
        setMyAppointments((prev) => prev.filter((a) => a._id !== aptId));
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
        <p className="text-2xl font-medium uppercase">My Appointments</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myAppointments.map((apt) => (
        <div
          key={apt._id}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>ApptId : {apt._id}</span>
            <span>Payment : {apt.paymentType}</span>
            <span>
              Total Amount : {currency}
              {apt.doctor?.fees ?? 0}
            </span>
          </p>

          <div className="relative bg-white text-gray-500/70 border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl">
            {/* Doctor + basic info */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary/10 p-4 rounded-lg">
                <img
                  src={apt.doctor?.image}
                  alt={apt.doctor?.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-medium text-gray-800">
                  {apt.doctor?.name}
                </h2>
                <p>Speciality : {apt.doctor?.speciality}</p>
              </div>
            </div>

            {/* Slot + status */}
            <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
              <p>
                Slot : {new Date(apt.date).toLocaleDateString()} | {apt.time}
              </p>
              <p>Status : {apt.status}</p>
              <p>
                Booked At : {new Date(apt.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Amount + actions */}
            <div className="flex flex-col items-end gap-2">
              <p>Amount : {currency} {apt.doctor?.fees}</p>
              <div className="flex flex-col gap-2 justify-end">
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => payOnline(apt)}
                  type="button"
                >
                  Pay Online
                </button>
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => cancelAppointment(apt._id)}
                  type="button"
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {myAppointments.length === 0 && (
        <p className="text-sm text-gray-500">No appointments yet.</p>
      )}
    </div>
  );
};

export default MyAppointments;

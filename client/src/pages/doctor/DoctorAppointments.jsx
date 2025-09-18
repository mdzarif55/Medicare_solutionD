import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DoctorAppointments = () => {
    const { axios } = useAppContext();
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get("/api/doctor/appointments");
            if (data.success) setAppointments(data.appointments);
        } catch (err) {
            toast.error("Failed to fetch appointments");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const { data } = await axios.post("/api/doctor/appointments/update", { appointmentId: id, status })
            if (data.success) {
                toast.success(data.message);
                fetchAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-7xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Appointments</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments yet</p>
            ) : (
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-4 text-left border font-medium text-gray-700">Patient</th>
                            <th className="p-4 text-left border font-medium text-gray-700">Date</th>
                            <th className="p-4 text-left border font-medium text-gray-700">Time</th>
                            <th className="p-4 text-left border font-medium text-gray-700">Status</th>
                            {/* <th className="p-4 text-left border font-medium text-gray-700">Fees</th> */}
                            <th className="p-4 text-left border font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((apt) => (
                            <tr key={apt._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-gray-800">{apt.user?.name || "N/A"}</td>
                                <td className="p-4 text-gray-600">{new Date(apt.date).toLocaleDateString()}</td>
                                <td className="p-4 text-gray-600">{apt.time}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm ${
                                            apt.status === "Scheduled"
                                                ? "bg-blue-500"
                                                : apt.status === "Cancelled"
                                                ? "bg-red-500"
                                                : "bg-green-600"
                                        }`}
                                    >
                                        {apt.status}
                                    </span>
                                </td>
                                {/* <td className="p-4 text-gray-600">{apt.fees ? `$${apt.fees}` : "N/A"}</td> */}
                                <td className="p-4 flex gap-3">
                                    {apt.status === "Scheduled" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(apt._id, "Cancelled")}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => updateStatus(apt._id, "Completed")}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all"
                                            >
                                                Complete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorAppointments;

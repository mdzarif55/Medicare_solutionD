import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DoctorList = () => {
    const { axios } = useAppContext();
    const [doctors, setDoctors] = useState([]);

    // fetch doctors from backend
    const fetchDoctors = async () => {
        try {
            const { data } = await axios.get("/api/doctor/list");
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // toggle active/inactive doctor
    const toggleActive = async (id, isActive) => {
        try {
            const { data } = await axios.post("/api/doctor/active", { id, isActive });
            if (data.success) {
                toast.success(data.message);
                fetchDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Doctors</h2>
                <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Doctor</th>
                                <th className="px-4 py-3 font-semibold truncate">Specialty</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Degree</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Fee</th>
                                <th className="px-4 py-3 font-semibold truncate">Available</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {doctors.map((doc) => (
                                <tr key={doc._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded overflow-hidden">
                                            <img
                                                src={doc.image}
                                                alt={doc.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">
                                            {doc.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{doc.speciality}</td>
                                    <td className="px-4 py-3 max-sm:hidden">{doc.degree}</td>
                                    <td className="px-4 py-3 max-sm:hidden">৳{doc.fees}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer gap-3">
                                            <input
                                                onChange={() => toggleActive(doc._id, !doc.isActive)}
                                                checked={doc.isActive}
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                        <span className={`ml-2 text-xs font-medium ${doc.isActive ? "text-green-600" : "text-red-500"}`}>
                                            {doc.isActive ? "Available" : "Unavailable"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;

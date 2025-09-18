import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";  // Assuming assets are imported from this path
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";  // Ensure toast is imported

const DoctorLayout = () => {
    const { axios, setIsDoctor } = useAppContext();
    const navigate = useNavigate();  // For navigation after logout

    // Logout function
    const logout = async () => {
        try {
            const { data } = await axios.get("/api/doctor/logout", { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                setIsDoctor(false);
                navigate("/doctor");  // redirect to login page
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 font-bold text-xl border-b">Doctor Dashboard</div>
                <nav className="flex flex-col p-4 gap-2">
                    <Link to="/doctor/profile" className="hover:bg-gray-200 p-2 rounded">My Profile</Link>
                    <Link to="/doctor/appointments" className="hover:bg-gray-200 p-2 rounded">Appointments</Link>
                    <Link to="/doctor/earnings" className="hover:bg-gray-200 p-2 rounded">Earnings</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
                    {/* Logo on the Left */}
                    <Link to="/">
                        <img src={assets.logo} alt="Logo" className="cursor-pointer w-48 md:w-60" />
                    </Link>

                    {/* Logout Button on the Right */}
                    <button
                        onClick={logout}
                        className="border rounded-full text-sm px-4 py-1 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                        Logout
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DoctorLayout;

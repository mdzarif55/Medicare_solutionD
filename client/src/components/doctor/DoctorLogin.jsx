import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DoctorLogin = () => {
    const { axios, setIsDoctor, navigate } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/doctor/login", { email, password });
            if (data.success) {
                toast.success("Login successful");
                setIsDoctor(true);
                navigate("/doctor");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get("/api/doctor/profile", { withCredentials: true });
                if (data.success) setIsDoctor(true);
            } catch {
                setIsDoctor(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <form 
            onSubmit={handleLogin} 
            className="min-h-screen flex items-center text-sm text-gray-600"
        >
            <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">Doctor</span> Login
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer hover:bg-primary-dull transition-all">
                    Login
                </button>
            </div>
        </form>
    );
};

export default DoctorLogin;

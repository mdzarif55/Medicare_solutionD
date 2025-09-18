import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DoctorEarnings = () => {
  const { axios, currency } = useAppContext();
  const [earnings, setEarnings] = useState(0);

  const fetchEarnings = async () => {
    try {
      const { data } = await axios.get("/api/doctor/earnings");
      if (data.success) {
        setEarnings(data.totalEarnings);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to load earnings");
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">My Earnings</h2>
      <p className="text-lg">
        💰 Total Earnings: <span className="font-semibold">{currency}{earnings}</span>
      </p>
    </div>
  );
};

export default DoctorEarnings;

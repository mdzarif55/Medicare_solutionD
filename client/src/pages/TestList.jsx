import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const TestsList = () => {
  const { axios } = useAppContext();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get("/api/catalog/list");
        if (data.success) {
          setTests(data.tests);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchTests();
  }, [axios]);

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Available Medical Tests</h1>

      {tests.length === 0 ? (
        <p className="text-gray-500">No tests available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tests.map((t) => (
            <div
              key={t._id}
              className="rounded-xl border p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{t.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                <p className="text-primary font-medium mt-2">৳{t.fees}</p>
              </div>
              {/* ✅ navigate to details */}
              <Link
                to={`/tests/${t._id}`}
                className="mt-4 inline-block px-4 py-2 rounded-lg bg-primary text-white text-center font-medium"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestsList;

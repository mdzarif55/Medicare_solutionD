import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const { axios } = useAppContext();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/doctor/profile", { withCredentials: true });
      if (data.success) setProfile(data.doctor);
      else toast.error(data.message || "Not authorized");
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const saveProfile = async () => {
    try {
      const { data } = await axios.post("/api/doctor/profile/update", {
        updateData: profile,
      });
      if (data.success) {
        toast.success(data.message);
        setEditMode(false);
      }
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const toggleAvailability = async () => {
    try {
      const { data } = await axios.post("/api/doctor/profile/update", {
        updateData: { isActive: !profile.isActive },
      });
      if (data.success) {
        setProfile({ ...profile, isActive: !profile.isActive });
        toast.success(`Availability turned ${!profile.isActive ? "ON" : "OFF"}`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to update availability");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-10 shadow-md rounded-2xl w-full border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h2>

      {/* ✅ Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column - Doctor Image + Availability */}
        <div className="flex flex-col items-center">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-40 h-40 rounded-xl  shadow-md object-contain bg-gray-100"
          />
          <p className="font-semibold text-lg mt-4">{profile.name}</p>
          <p className="text-sm text-gray-500">{profile.speciality}</p>
          <button
            onClick={toggleAvailability}
            className={`mt-4 px-5 py-2 text-sm font-medium rounded-lg shadow transition ${
              profile.isActive
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {profile.isActive ? "Available" : "Unavailable"}
          </button>
        </div>

        {/* Right Column - Profile Form */}
        <div className="md:col-span-2 space-y-5">
          <input
            type="text"
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!editMode}
            className="w-75 border p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300 disabled:bg-gray-100"
          /> <br />
          <input
            type="text"
            value={profile.speciality || ""}
            onChange={(e) =>
              setProfile({ ...profile, speciality: e.target.value })
            }
            disabled={!editMode}
            className="w-75 border p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300 disabled:bg-gray-100"
          /> <br />
          <textarea
            value={profile.about || ""}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            disabled={!editMode}
            className="w-full h-30 border p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300 disabled:bg-gray-100"
          />
          <input
            type="number"
            value={profile.fees || ""}
            onChange={(e) => setProfile({ ...profile, fees: e.target.value })}
            disabled={!editMode}
            className="w-20 border p-1 text-center rounded-lg shadow-sm focus:ring focus:ring-blue-300 disabled:bg-gray-100"
          />

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={saveProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-2 rounded-lg shadow"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

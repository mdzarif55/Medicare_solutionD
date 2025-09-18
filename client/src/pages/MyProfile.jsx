import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { axios } = useAppContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
  // 🔹 fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/user/is-auth", {
          withCredentials: true,
        });
        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [axios]);

  if (loading) {
    return <p className="mt-20 text-center text-lg">Loading profile...</p>;
  }

  if (!user) {
    return <p className="mt-20 text-center text-lg text-red-500">User not found</p>;
  }
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <div className="mt-16 max-w-md mx-auto px-4 pb-20">
      <div className="bg-white shadow-lg rounded-xl border p-6 flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow mb-3">
          <img
            src={user.image || "/default-avatar.png"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500 text-sm mb-4">Welcome to your profile</p>

        <div className="w-full mt-4 space-y-3 text-sm">
          <div className="flex justify-between border-b pb-1">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium text-gray-800">{user.phone || "+880 123 456 789"}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-gray-500">Date Of Birth</span>
            <span className="font-medium text-gray-800">{user.phone || "01 / 02 / 2020"}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-gray-500">Joined</span>
            <span className="font-medium text-gray-800">
              {formatDate(new Date())}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition">
            Edit Profile
          </button>
          <button onClick={logout} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-200 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'

// const MyProfile = () => {

//   const [userData, setUserData] = useState({
//     name: "Muhtasim Zarif",
//     // image: assets.profile_pic,
//     email: 'Muhtasimzarif55@gmail.com.com',
//     phone: '(+880) 019330-098138',
//     address: {
//       line1: "sobhanbag,dhanmondi27",
//       line2: "Dhaka, Bangladesh"
//     },
//     gender: 'Male',
//     dob: '2001-03-31'
//   })

//   const [isEdit, setIsEdit] = useState(false)

//   return (
//     <div className='max-w-sm flex flex-col gap-2 text-sm'>
//       <img className='w-36 rounded' src={userData.image} alt="" />

//       {
//         isEdit
//           ? <input
//               className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
//               type="text"
//               value={userData.name}
//               onChange={e =>
//                 setUserData(prev => ({ ...prev, name: e.target.value }))
//               }
//             />
//           : <p className='font-medium text-3xl text-neutral-800 mt-4 '>{userData.name}</p>
//       }

//       <hr className='bg-zinc-400 h-[1px] border-none'/>
//       <div>
//         <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>

//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Email id:</p>
//           <p className='text-blue-500'>{userData.email}</p>

//           <p className='font-medium'>Phone:</p>
//           {
//             isEdit
//               ? <input
//                   className='bg-gray-100 max-w-52'
//                   type="text"
//                   value={userData.phone}
//                   onChange={e =>
//                     setUserData(prev => ({ ...prev, phone: e.target.value }))
//                   }
//                 />
//               : <p className='text-blue-400'>{userData.phone}</p>
//           }

//           <p className='font-medium'>Address:</p>
//           {
//             isEdit
//               ? <p>
//                   <input
//                     className='bg-gray-50'
//                     type="text"
//                     value={userData.address.line1}
//                     onChange={(e) =>
//                       setUserData(prev => ({
//                         ...prev,
//                         address: { ...prev.address, line1: e.target.value }
//                       }))
//                     }
//                   />
//                   <input
//                     className='bg-gray-50'
//                     type="text"
//                     value={userData.address.line2}
//                     onChange={(e) =>
//                       setUserData(prev => ({
//                         ...prev,
//                         address: { ...prev.address, line2: e.target.value }
//                       }))
//                     }
//                   />
//                 </p>
//               : <p className='text-gray-500 '>
//                   {userData.address.line1}
//                   <br />
//                   {userData.address.line2}
//                 </p>
//           }
//         </div>
//       </div>

//       <div>
//         <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Gender:</p>
//           {
//             isEdit
//               ? <select
//                   className='bg-gray-100 max-w-20'
//                   value={userData.gender}
//                   onChange={(e) =>
//                     setUserData(prev => ({ ...prev, gender: e.target.value }))
//                   }
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Others">Others</option>
//                 </select>
//               : <p className='text-gray-400'>{userData.gender}</p>
//           }

//           <p className='font-medium'>Birthday:</p>
//           {
//             isEdit
//               ? <input
//                   className='bg-gray-100 max-w-28'
//                   type="date"
//                   value={userData.dob}
//                   onChange={(e) =>
//                     setUserData(prev => ({ ...prev, dob: e.target.value }))
//                   }
//                 />
//               : <p className='text-gray-400'>{userData.dob}</p>
//           }
//         </div>
//       </div>

//       <div className='mt-10'>
//         {isEdit
//           ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all ' onClick={() => setIsEdit(false)}>Save Information</button>
//           : <button className='border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
//         }
//       </div>
//     </div>
//   )
// }

// export default MyProfile

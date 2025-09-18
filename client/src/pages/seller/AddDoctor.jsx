import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets'; // for upload_area placeholder

const AddDoctor = () => {
  const { axios } = useAppContext();

  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const doctorData = {
        name,
        speciality,
        degree,
        experience,
        fees,
        about,
        email,
        password,
        address: { line1: addressLine1, line2: addressLine2 },
      };

      const formData = new FormData();
      formData.append('doctorData', JSON.stringify(doctorData));
      if (file) formData.append('image', file);

      const { data } = await axios.post('/api/doctor/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setName('');
        setSpeciality('');
        setDegree('');
        setExperience('');
        setFees('');
        setAbout('');
        setAddressLine1('');
        setAddressLine2('');
        setEmail('');
        setPassword('');
        setFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* Doctor Image */}
        <div>
          <p className="text-base font-medium">Doctor Image</p>
          <label
            htmlFor="doctor-image"
            className="w-24 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              id="doctor-image"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={file ? URL.createObjectURL(file) : assets.upload_area}
              alt="uploadArea"
              className="object-contain w-full h-full"
            />
          </label>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="doctor-name">
            Name
          </label>
          <input
            id="doctor-name"
            type="text"
            placeholder="Doctor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Speciality */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="speciality">
            Speciality
          </label>
          <input
            id="speciality"
            type="text"
            placeholder="e.g. Neurologist"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Degree & Experience */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="degree">
              Degree
            </label>
            <input
              id="degree"
              type="text"
              placeholder="MBBS, FCPS"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="experience">
              Experience
            </label>
            <input
              id="experience"
              type="text"
              placeholder="10 Years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Fees */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="fees">
            Consultation Fee
          </label>
          <input
            id="fees"
            type="number"
            placeholder="e.g. 1000"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="doctor@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Set login password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* About */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            rows={4}
            placeholder="Write short biography..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Address</label>
          <input
            type="text"
            placeholder="Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 mb-2"
          />
          <input
            type="text"
            placeholder="Line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <button className="px-8 py-2.5 bg-primary cursor-pointer hover:bg-primary-dull transition-all text-white font-medium rounded">
          ADD DOCTOR
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;



// import React, { useState } from 'react';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';
// import { assets } from '../../assets/assets'; // for upload_area placeholder

// const AddDoctor = () => {
//     const { axios } = useAppContext();

//     const [file, setFile] = useState(null);
//     const [name, setName] = useState('');
//     const [speciality, setSpeciality] = useState('');
//     const [degree, setDegree] = useState('');
//     const [experience, setExperience] = useState('');
//     const [fees, setFees] = useState('');
//     const [about, setAbout] = useState('');
//     const [addressLine1, setAddressLine1] = useState('');
//     const [addressLine2, setAddressLine2] = useState('');

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         try {
//             const doctorData = {
//                 name,
//                 speciality,
//                 degree,
//                 experience,
//                 fees,
//                 about,
//                 address: { line1: addressLine1, line2: addressLine2 }
//             };

//             const formData = new FormData();
//             formData.append('doctorData', JSON.stringify(doctorData));
//             if (file) formData.append('image', file);

//             const { data } = await axios.post('/api/doctor/add', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: true, // important if you require seller auth cookie
//             });

//             if (data.success) {
//                 toast.success(data.message);
//                 setName('');
//                 setSpeciality('');
//                 setDegree('');
//                 setExperience('');
//                 setFees('');
//                 setAbout('');
//                 setAddressLine1('');
//                 setAddressLine2('');
//                 setFile(null);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//             <form
//                 onSubmit={onSubmitHandler}
//                 className="md:p-10 p-4 space-y-5 max-w-lg"
//             >
//                 {/* Doctor Image */}
//                 <div>
//                     <p className="text-base font-medium">Doctor Image</p>
//                     <label
//                         htmlFor="doctor-image"
//                         className="w-24  flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
//                     >
//                         <input
//                             type="file"
//                             accept="image/*"
//                             id="doctor-image"
//                             hidden
//                             onChange={(e) => setFile(e.target.files[0])}
//                         />
//                         <img
//                             src={file ? URL.createObjectURL(file) : assets.upload_area}
//                             alt="uploadArea"
//                             className="object-contain w-full h-full"
//                         />
//                     </label>

//                 </div>

//                 {/* Name */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="doctor-name">
//                         Name
//                     </label>
//                     <input
//                         id="doctor-name"
//                         type="text"
//                         placeholder="Doctor name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         required
//                     />
//                 </div>

//                 {/* Speciality */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="speciality">
//                         Speciality
//                     </label>
//                     <input
//                         id="speciality"
//                         type="text"
//                         placeholder="e.g. Neurologist"
//                         value={speciality}
//                         onChange={(e) => setSpeciality(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         required
//                     />
//                 </div>

//                 {/* Degree & Experience */}
//                 <div className="flex items-center gap-5 flex-wrap">
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label className="text-base font-medium" htmlFor="degree">
//                             Degree
//                         </label>
//                         <input
//                             id="degree"
//                             type="text"
//                             placeholder="MBBS, FCPS"
//                             value={degree}
//                             onChange={(e) => setDegree(e.target.value)}
//                             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         />
//                     </div>
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label className="text-base font-medium" htmlFor="experience">
//                             Experience
//                         </label>
//                         <input
//                             id="experience"
//                             type="text"
//                             placeholder="10 Years"
//                             value={experience}
//                             onChange={(e) => setExperience(e.target.value)}
//                             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         />
//                     </div>
//                 </div>

//                 {/* Fees */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="fees">
//                         Consultation Fee
//                     </label>
//                     <input
//                         id="fees"
//                         type="number"
//                         placeholder="e.g. 1000"
//                         value={fees}
//                         onChange={(e) => setFees(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         required
//                     />
//                 </div>

//                 {/* About */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="about">
//                         About
//                     </label>
//                     <textarea
//                         id="about"
//                         rows={4}
//                         placeholder="Write short biography..."
//                         value={about}
//                         onChange={(e) => setAbout(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//                     />
//                 </div>

//                 {/* Address */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium">Address</label>
//                     <input
//                         type="text"
//                         placeholder="Line 1"
//                         value={addressLine1}
//                         onChange={(e) => setAddressLine1(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 mb-2"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Line 2"
//                         value={addressLine2}
//                         onChange={(e) => setAddressLine2(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                     />
//                 </div>

//                 <button className="px-8 py-2.5 bg-primary cursor-pointer hover:bg-primary-dull transition-all text-white font-medium rounded">
//                     ADD DOCTOR
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddDoctor;


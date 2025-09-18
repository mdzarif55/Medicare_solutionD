import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
    const { _id, image, name, speciality, fees, address } = doctor || {};

    return (
        <div className="border rounded-2xl p-3 hover:shadow-lg transition-all duration-300">
            <Link to={`/doctors/${_id}`}>
                {/* Image wrapper with hover lift */}
                <div className="w-full aspect-[4/3] rounded-xl mb-3 bg-gray-50 overflow-hidden flex items-center justify-center">
                    <img
                        src={image}
                        alt={name}
                        className="max-w-full max-h-full object-contain transform transition-transform duration-300 hover:-translate-y-2"
                        loading="lazy"
                    />
                </div>
                {/* <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p></p><p className='w-2 h-2 bg-green-500 rounded-full-'></p><p>Available </p>
                </div> */}

                <h3 className="font-semibold leading-tight line-clamp-2">{name}</h3>
                <p className="text-medium text-gray-600 mt-1">{speciality}</p>
                {/* {address?.line2 && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{address.line2}</p>
        )} */}
                {typeof fees !== 'undefined' && (
                    <p className="text-medium font-medium mt-2">Fee: ৳{fees}</p>
                )}
                <button
                    className="mt-3 w-full cursor-pointer bg-primary text-white text-sm py-2 rounded-xl hover:opacity-90 transition"
                    type="button"
                >
                    Book appointment
                </button>
            </Link>
        </div>
    );
};

export default DoctorCard;

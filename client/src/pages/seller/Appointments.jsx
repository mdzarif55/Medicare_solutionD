import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Appointments = () => {
    const { currency, axios } = useAppContext();
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get('/api/appointment/all');
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium">Appointments List</h2>

                {appointments.map((appointment, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
                    >
                        {/* Doctor Details */}
                        <div className="flex flex-col gap-3 max-w-80">
                            <div key={index} className="flex items-center gap-3">
                                <img
                                    className="w-12 h-12 object-cover border rounded"
                                    src={appointment.doctor?.image || 'default-image.jpg'}
                                    alt={appointment.doctor?.name || 'Doctor Image'}
                                />
                                <p className="text-md font-medium">
                                    {appointment.doctor?.name} - {appointment.doctor?.speciality}
                                </p>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="text-sm md:text-base text-black/60">
                            <p>Slot: {new Date(appointment.date).toLocaleDateString()} | {appointment.time}</p>
                            <p>Status: {appointment.status}</p>
                        </div>

                        {/* Amount */}
                        <p className="font-medium text-lg my-auto">
                            Fees: {currency}{appointment.doctor?.fees}
                        </p>

                        {/* Payment Info */}
                        <div className="flex flex-col text-sm md:text-base text-black/60">
                            <p>Payment Method: {appointment.paymentType}</p>
                            <p>Date: {new Date(appointment.createdAt).toLocaleDateString()}</p>
                            <p>Payment Status: {appointment.isPaid ? "Paid" : "Pending"}</p>
                            {/* Show Doctor Fees */}
                            {/* <p className="text-sm font-medium text-black/60">
                                Fees: {currency}{appointment.doctor?.fees}
                            </p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;

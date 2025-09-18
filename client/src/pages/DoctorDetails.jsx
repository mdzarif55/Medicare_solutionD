import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="min-w-28 text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function buildNext7DaysSlots() {
  const slotsPerDay = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    if (today.toDateString() === currentDate.toDateString()) {
      const start = new Date();
      const hour = start.getHours();
      const minute = start.getMinutes();
      const startHour = Math.max(hour + (minute > 30 ? 1 : 0), 10);
      currentDate.setHours(startHour, minute > 30 ? 30 : 0, 0, 0);
    } else {
      currentDate.setHours(10, 0, 0, 0);
    }

    const daySlots = [];
    while (currentDate < endTime) {
      daySlots.push({
        datetime: new Date(currentDate),
        time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }
    slotsPerDay.push(daySlots);
  }
  return slotsPerDay;
}

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [doctor, setDoctor] = useState(null);
  const [related, setRelated] = useState([]);

  // booking state
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    setDocSlots(buildNext7DaysSlots());
  }, []);

  // fetch doctor by id
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.post('/api/doctor/id', { id });
        if (data.success) {
          setDoctor(data.doctor);

          // fetch related
          const listRes = await axios.get('/api/doctor/list');
          if (listRes.data.success) {
            setRelated(
              listRes.data.doctors.filter(
                (d) => d._id !== data.doctor._id && d.speciality === data.doctor.speciality
              )
            );
          }
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    if (id) fetchDoctor();
  }, [id, axios]);

  const selectedDay = docSlots[slotIndex] || [];
  const selectedSlot = selectedDay.find((s) => s.time === slotTime);

  const bookAppointment = async () => {
    try {
      if (!slotTime || !selectedSlot) return;

      const payload = {
        doctorId: doctor._id,
        date: selectedSlot.datetime,
        time: slotTime,
      };

      const { data } = await axios.post('/api/appointment/book', payload, { withCredentials: true });

      if (data.success) {
        toast.success('Appointment booked!');
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (!doctor) {
    return (
      <div className="mt-16 max-w-4xl mx-auto px-4">
        <div className="rounded-2xl border p-6">
          <p className="text-lg font-semibold">Doctor not found</p>
          <Link to="/doctors" className="text-sm text-primary underline mt-2 inline-block">
            Back to all doctors
          </Link>
        </div>
      </div>
    );
  }

  const { image, name, speciality, degree, experience, fees, address, about } = doctor;

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/doctors" className="hover:underline">Doctors</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{name}</span>
      </nav>

      {/* Header */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="w-full rounded-2xl border bg-gray-50 overflow-hidden flex items-center justify-center">
            <img src={image} alt={name} className="max-w-full max-h-[420px] object-contain" />
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
          <p className="mt-1 inline-flex items-center text-sm font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {speciality}
          </p>

          <div className="mt-4 space-y-2">
            <InfoRow label="Degree" value={degree} />
            <InfoRow label="Experience" value={experience} />
            {typeof fees !== 'undefined' && <InfoRow label="Consultation fee" value={`৳${fees}`} />}
            <InfoRow
              label="Address"
              value={[address?.line1, address?.line2].filter(Boolean).join(', ')}
            />
          </div>

          {about && <p className="mt-5 text-base text-gray-700">{about}</p>}

          {/* Booking slots */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700">Booking slots</p>
            {/* Days */}
            <div className="flex gap-3 mt-3 overflow-x-auto">
              {docSlots.map((day, idx) => {
                const first = day[0];
                const labelDay = first ? daysOfWeek[first.datetime.getDay()] : '--';
                const dateNum = first ? first.datetime.getDate() : '--';
                const active = slotIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { setSlotIndex(idx); setSlotTime(''); }}
                    className={`py-3 min-w-16 rounded-full border ${
                      active ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="text-xs">{labelDay}</div>
                    <div className="text-sm font-semibold">{dateNum}</div>
                  </button>
                );
              })}
            </div>
            {/* Times */}
            <div className="flex gap-3 mt-3 overflow-x-auto">
              {selectedDay.map((slot, idx) => {
                const active = slot.time === slotTime;
                return (
                  <button
                    key={idx}
                    onClick={() => setSlotTime(slot.time)}
                    className={`text-sm px-4 py-2 rounded-full border ${
                      active ? 'bg-primary text-white border-primary' : 'text-gray-600 border-gray-300'
                    }`}
                  >
                    {slot.time.toLowerCase()}
                  </button>
                );
              })}
            </div>
            {selectedSlot && (
              <p className="mt-3 text-sm text-gray-700">
                Selected: <span className="font-medium">{daysOfWeek[selectedSlot.datetime.getDay()]}, {selectedSlot.datetime.getDate()} · {selectedSlot.time.toLowerCase()}</span>
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`px-5 py-2.5 rounded-xl border font-medium ${
                slotTime
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
              }`}
            >
              Book appointment
            </button>
            <a href="tel:+880000000000" className="px-5 py-2.5 rounded-xl border">Call clinic</a>
            <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl border">Back</button>
          </div>
        </div>
      </div>

      {/* Related doctors */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg md:text-xl font-semibold mb-4">More {speciality} near you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {related.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;

import React, { useEffect, useMemo, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { useAppContext } from '../context/AppContext';

const AllDoctors = () => {
  const { searchQuery, axios } = useAppContext();

  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState('All');

  // 🔹 Fetch doctors from backend on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/api/doctor/list');
        if (data.success) {
          setDoctors(data.doctors);
        }
      } catch (err) {
        console.error('Failed to load doctors', err.message);
      }
    };
    fetchDoctors();
  }, [axios]);

  // Build unique list of specialties
  const specialties = useMemo(() => {
    const set = new Set();
    doctors.forEach((d) => {
      const s = d?.speciality;
      if (Array.isArray(s)) {
        s.forEach((x) => x && set.add(String(x).trim()));
      } else if (s) {
        set.add(String(s).trim());
      }
    });
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const q =
      typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : '';

    return doctors.filter((d) => {
      const name = (d?.name ?? '').toLowerCase();
      const rawSpec = d?.speciality;
      const specList = Array.isArray(rawSpec)
        ? rawSpec.map((s) => String(s).toLowerCase())
        : [String(rawSpec ?? '').toLowerCase()];

      const matchesSearch =
        !q || name.includes(q) || specList.some((s) => s.includes(q));

      const matchesSpecialty =
        specialty === 'All' ||
        specList.includes(String(specialty).toLowerCase());

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchQuery, specialty]);

  return (
    <div>
      <div className="mt-16 flex flex-col">
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium uppercase">All Doctors</p>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </div>

        {/* Category (Specialty) Filter */}
        <div className="mt-16">
          <div className="flex items-center justify-between gap-3">
            <p className="text-medium font-medium">Filter by Specialty</p>
            <button
              type="button"
              onClick={() => setSpecialty('All')}
              className="text-xs text-primary hover:underline transition-transform duration-150 transform-gpu hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Clear specialty filter">
              Clear
            </button>
          </div>

          {/* Specialty Chips */}
          <div className="mt-2 flex gap-2 overflow-x-auto py-1">
            {specialties.map((s) => {
              const isActive = specialty === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpecialty(s)}
                  className={[
                    'px-3.5 py-2.5 rounded-full border text-medium whitespace-nowrap',
                    'transition-all duration-150 ease-out transform-gpu will-change-transform',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                    'active:translate-y-0 active:shadow-none cursor-pointer',
                    isActive
                      ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5'
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5'
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <p className="text-sm text-gray-500 mt-6">
            No doctors match your search{specialty !== 'All' ? ` in ${specialty}` : ''}.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;

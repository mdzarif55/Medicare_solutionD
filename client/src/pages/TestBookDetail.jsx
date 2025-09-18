import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// 🔹 Slot generator (7 days, 9AM–8PM, every 30 min)
function buildNext7DaysSlots() {
    const slotsPerDay = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const endTime = new Date(currentDate);
        endTime.setHours(20, 0, 0, 0); // till 8PM

        if (today.toDateString() === currentDate.toDateString()) {
            const start = new Date();
            const hour = start.getHours();
            const minute = start.getMinutes();
            const startHour = Math.max(hour + (minute > 30 ? 1 : 0), 9);
            currentDate.setHours(startHour, minute > 30 ? 30 : 0, 0, 0);
        } else {
            currentDate.setHours(9, 0, 0, 0);
        }

        const daySlots = [];
        while (currentDate < endTime) {
            daySlots.push({
                datetime: new Date(currentDate),
                time: currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });
            currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        slotsPerDay.push(daySlots);
    }
    return slotsPerDay;
}

const TestBookDetail = () => {
    const { id } = useParams(); // ✅ testId from URL
    const navigate = useNavigate();
    const { axios } = useAppContext();

    const [test, setTest] = useState(null);

    // booking state
    const [slots, setSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    useEffect(() => {
        setSlots(buildNext7DaysSlots());
    }, []);

    // 🔹 Fetch test by ID (POST with body)
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const { data } = await axios.post("/api/catalog/id", { id });// ✅ send in body
                if (data.success) {
                    setTest(data.test);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error(err.message);
            }
        };
        if (id) fetchTest();
    }, [id, axios]);

    const selectedDay = slots[slotIndex] || [];
    const selectedSlot = selectedDay.find((s) => s.time === slotTime);

    // 🔹 Book test
    const bookTest = async () => {
        try {
            if (!slotTime || !selectedSlot) return;

            const payload = {
                testName: test.name,
                date: selectedSlot.datetime,
                time: slotTime,
                fees: test.fees,
            };

            const { data } = await axios.post("/api/test/book", payload, {
                withCredentials: true,
            });

            if (data.success) {
                toast.success("Test booked successfully!");
                navigate("/my-tests");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    // 🔹 Loading state
    if (!test) {
        return (
            <div className="mt-16 max-w-4xl mx-auto px-4">
                <div className="rounded-2xl border p-6">
                    <p className="text-lg font-semibold">Loading test details...</p>
                    <Link
                        to="/tests"
                        className="text-sm text-primary underline mt-2 inline-block"
                    >
                        Back to all tests
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 max-w-5xl mx-auto px-4">
            {/* 🔹 Breadcrumbs */}
            <nav className="text-sm text-gray-500">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link to="/tests" className="hover:underline">
                    Medical Tests
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{test.name}</span>
            </nav>

            {/* 🔹 Header */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border bg-gray-50 p-6">
                    <h1 className="text-2xl font-bold">{test.name}</h1>
                    <p className="text-gray-600 mt-2">{test.description}</p>
                    <p className="text-lg font-semibold text-primary mt-3">
                        ৳{test.fees}
                    </p>
                </div>

                {/* 🔹 Booking slots */}
                <div className="rounded-2xl border p-6">
                    <p className="text-sm font-semibold text-gray-700">Choose Slot</p>

                    {/* Days */}
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                        {slots.map((day, idx) => {
                            const first = day[0];
                            const labelDay = first
                                ? daysOfWeek[first.datetime.getDay()]
                                : "--";
                            const dateNum = first ? first.datetime.getDate() : "--";
                            const active = slotIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setSlotIndex(idx);
                                        setSlotTime("");
                                    }}
                                    className={`px-4 py-2 rounded-lg border ${active
                                            ? "bg-primary text-white border-primary"
                                            : "border-gray-200 text-gray-700"
                                        }`}
                                >
                                    <div className="text-xs">{labelDay}</div>
                                    <div className="text-sm font-semibold">{dateNum}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Times */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {selectedDay.map((slot, idx) => {
                            const active = slot.time === slotTime;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSlotTime(slot.time)}
                                    className={`text-sm px-3 py-1.5 rounded-lg border ${active
                                            ? "bg-primary text-white border-primary"
                                            : "text-gray-600 border-gray-300"
                                        }`}
                                >
                                    {slot.time.toLowerCase()}
                                </button>
                            );
                        })}
                    </div>

                    {selectedSlot && (
                        <p className="mt-3 text-sm text-gray-700">
                            Selected:{" "}
                            <span className="font-medium">
                                {daysOfWeek[selectedSlot.datetime.getDay()]},{" "}
                                {selectedSlot.datetime.getDate()} ·{" "}
                                {selectedSlot.time.toLowerCase()}
                            </span>
                        </p>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={bookTest}
                            disabled={!slotTime}
                            className={`px-5 py-2.5 rounded-xl border font-medium ${slotTime
                                    ? "bg-primary text-white border-primary"
                                    : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Book Test
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2.5 rounded-xl border"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestBookDetail;

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaClock } from "react-icons/fa";
import { useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const EachEventDetails = () => {
  const navigate = useNavigate();
  const { eventid } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [eachData, setEachData] = useState({});
  const [value, setValue] = useState(0);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const url = `http://localhost:5678/user/allevents/${eventid}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const event = data.message;
          console.log(event)
          setEachData(event);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventDetails();
  }, [eventid, jwtToken]);

  useEffect(() => {
    if (eachData.StartDate) {
      const today = new Date();
      const eventStart = new Date(eachData.StartDate);
      eventStart.setDate(eventStart.getDate() - 1); // 5 days before event

      const isValid = today > eventStart;
      setIsRegistrationOpen(isValid);
    }
  }, [eachData]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${month} ${day} ${year}`;
  };

  // 🔹 Deadline (5 days before)
  const DeadLineDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() - 5);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${month} ${day} ${year}`;
  };

  const handleBackBtn = () => {
    navigate("/user/allevents", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white p-8 flex flex-col items-center pt-30">
      {/* Header */}
      <div className="w-full max-w-5xl mb-6">
        <div className="flex items-center gap-2 text-sm mb-1">
          <span
            className="pr-5 border border-amber-800 text-center rounded-4xl cursor-pointer hover:bg-amber-900 transition"
            onClick={handleBackBtn}
          >
            <FaArrowLeft size={20} />
          </span>
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full">
            🎓 {eachData.Organizer} Event
          </span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>
        <h1 className="text-4xl font-bold mt-2">{eachData.EventTitle}</h1>
        <p className="text-gray-400 pt-1">
          👤 Organized by {eachData.OrganisationName}
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Event Details */}
          <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="flex items-center gap-2 text-gray-300">
                  <FaCalendarAlt className="text-purple-400" /> Start Date
                </p>
                <p className="mt-1 text-gray-100 font-medium">
                  {formatDate(eachData.StartDate)}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-gray-300">
                  <FaCalendarAlt className="text-purple-400" /> End Date
                </p>
                <p className="mt-1 text-gray-100 font-medium">
                  {formatDate(eachData.EndDate)}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-gray-300">
                  <FaMapMarkerAlt className="text-purple-400" /> Location
                </p>
                <p className="mt-1 text-gray-100 font-medium">
                  {eachData.Venue}, {eachData.City}, {eachData.State}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-gray-300">
                  <FaTrophy className="text-yellow-400" /> Prize Pool
                </p>
                <p className="mt-1 text-yellow-400 font-semibold">
                  ₹ {eachData.PricePool} in prizes
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-300 leading-relaxed">
              {eachData.EventDescription}
            </p>
          </div>

          {/* Technologies Section */}
          <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">Technologies & Topics</h2>
            <div className="flex flex-wrap gap-2">
              {eachData.SpecifiedStacks &&
                eachData.SpecifiedStacks.split(",").map((stack, index) => (
                  <p
                    key={index}
                    className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
                  >
                    {stack.trim()}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Registration */}
          <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Registration</h2>

            <p className="text-sm mb-2">
              <span className="float-right text-gray-200">
                10 / {eachData.Slots}
              </span>
            </p>

            <div className="w-full mb-2">
              <input
                type="range"
                min="0"
                max={eachData.Slots}
                step="5"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-64 accent-violet-600"
              />
            </div>

            <p className="text-gray-400 text-xs mb-3">
              {eachData.Slots - 10} spots remaining
            </p>
            <p className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <FaClock /> Deadline: {DeadLineDate(eachData.EndDate)}
            </p>

            {/* Conditional Button */}
            {!isRegistrationOpen ? (
              <div className="w-full bg-gradient-to-r text-center from-blue-600 to-blue-800 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                <a href={`${eachData.FormLink}`} target="_blank" rel="noopener noreferrer" >Apply Now</a>
              </div>
            ) : (
              <button className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 rounded-lg font-semibold cursor-not-allowed opacity-70">
                 Expires
              </button>
            )}

            <p className="text-center text-xs text-gray-400 mt-2">
              Complete the application form to register
            </p>
          </div>

          {/* Event Stats */}
          <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">Event Statistics</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Event Type:</span>{" "}
                <span className="font-medium">College Event</span>
              </p>
              <p>
                <span className="text-gray-400">Duration:</span>{" "}
                <span className="font-medium">
                  {Math.floor(
                    (new Date(eachData.EndDate) - new Date(eachData.StartDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  Days
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachEventDetails;

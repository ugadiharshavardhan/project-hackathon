import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { useNavigate } from 'react-router';
import { ThreeDot } from "react-loading-indicators";

function Eventsbyuser() {

  const [appliedData, setAppliedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = "https://project-hackathon-7utw.onrender.com/user/appliedevents";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("jwt_token")}`
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setAppliedData(data.events || []);
      } catch (error) {
        console.error("Error fetching applied events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <ThreeDot color="#3b82f6" size="medium" />
      </div>
    );
  }

  if (!loading && appliedData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-gray-300">
        <img
          src="https://www.iimnagpur.ac.in/CoE/CLEAD/wp-content/themes/iimnagpur_clead/images/no-event.jpg"
          alt="No Applied Events"
          className="w-64 opacity-70"
        />
        <h2 className="mt-6 text-xl font-semibold">No Applied Events Found</h2>
      </div>
    );
  }

  const handleViewDetails = (eventid) => {
    navigate(`/user/allevents/${eventid}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 pt-20">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        <span className="text-blue-500">Applied</span> Events
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {appliedData.map((each, id) => (
          <li
            key={id}
            className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-yellow-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {each.eventTitle?.toUpperCase()}
              </span>
              <span className="bg-purple-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {each.eventType?.toUpperCase()}
              </span>
              <span className="bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Applied
              </span>
            </div>

            {/* Description */}
            <div className="flex gap-2 mb-4">
              <FcAbout className="mt-1" />
              <p className="text-gray-400 text-sm leading-relaxed">
                {each.ideaDescription}
              </p>
            </div>

            <hr className="border-gray-800 my-4" />

            {/* Member Details */}
            <h3 className="text-blue-400 font-semibold mb-2">Applicant Details</h3>
            <div className="text-gray-400 text-sm space-y-1">
              <p><span className="text-gray-300">Name:</span> {each.fullName}</p>
              <p><span className="text-gray-300">Email:</span> {each.email}</p>
              <p><span className="text-gray-300">Institute:</span> {each.institution}</p>
              <p><span className="text-gray-300">Phone:</span> {each.phoneNumber}</p>
              <p><span className="text-gray-300">Team:</span> {each.teamName}</p>
              <p><span className="text-gray-300">Members:</span> {each.membersCount}</p>
            </div>

            <hr className="border-gray-800 my-4" />

            {/* Event Details */}
            <h3 className="text-blue-400 font-semibold mb-2">Event Details</h3>
            <div className="text-gray-400 text-sm space-y-1">
              <p>
                <span className="text-gray-300">Start:</span>{" "}
                {each.StartDate ? each.StartDate.split("T")[0] : "N/A"}
              </p>
              <p>
                <span className="text-gray-300">End:</span>{" "}
                {each.EndDate ? each.EndDate.split("T")[0] : "N/A"}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
              <FaMapMarkerAlt />
              <span>
                {each.Venue || "Unknown Venue"}, {each.EventCity || "Unknown City"}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {each.skills?.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleViewDetails(each.event)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
              >
                View Details <FaExternalLinkAlt size={12} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Eventsbyuser;

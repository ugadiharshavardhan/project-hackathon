import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaClock } from "react-icons/fa";
import { useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { FaRegBookmark } from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";

const EachEventDetails = () => {
  const navigate = useNavigate();
  const { eventid } = useParams();
  const jwtToken = Cookies.get("jwt_token");

  const [isSaved, setIsSaved] = useState(false);
  const [eachData, setEachData] = useState({});
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  /* ---------------- FETCH EVENT DETAILS ---------------- */
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const url = `https://project-hackathon-7utw.onrender.com/user/allevents/${eventid}`;
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
          setEachData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventDetails();
  }, [eventid, jwtToken]);

  /* ---------------- FETCH SAVED STATUS ---------------- */
  useEffect(() => {
    let isMounted = true;
    
    const fetchSavedStatus = async () => {
      if (!eventid || !jwtToken) return;
      
      try {
        const url = `https://project-hackathon-7utw.onrender.com/user/saved/${eventid}`;
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
          if (isMounted) {
            setIsSaved(!!data.isSaved);
          }
        }
      } catch (err) {
        console.error("Error fetching saved status:", err);
        if (isMounted) {
          setIsSaved(false);
        }
      }
    };

    fetchSavedStatus();
    
    return () => {
      isMounted = false;
    };
  }, [eventid, jwtToken]);

  useEffect(() => {
    if (eachData.StartDate) {
      const today = new Date();
      const eventStart = new Date(eachData.StartDate);
      eventStart.setDate(eventStart.getDate() - 1);
      setIsRegistrationOpen(today > eventStart);
    }
  }, [eachData]);

  const handleApplyNow = () => {
    navigate(`/events/apply/${eventid}`, { replace: true });
  };

  const handleBackBtn = () => {
    navigate("/user/allevents", { replace: true });
  };

  const handleSaveBtn = async () => {
    if (!eventid || !jwtToken) {
      console.error("Missing event ID or authentication token");
      return;
    }

    const newSaveState = !isSaved;
    const previousState = isSaved;
    
    setIsSaved(newSaveState);
    
    try {
      const url = "https://project-hackathon-7utw.onrender.com/user/saved";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          eventid,
          save: newSaveState,
        }),
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error('Failed to update saved status');
      }
      
    } catch (err) {
      console.error("Error updating saved status:", err);
      setIsSaved(previousState);
    }
  };

  /* ---------------- DATE ---------------- */
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

  return (
    <div>
      {eachData.EventTitle ? (
        <div className="min-h-screen bg-[#0b0b0d] text-white p-8 flex flex-col items-center pt-30">
          <div className="w-full max-w-5xl mb-6">
            <div className="flex justify-between gap-2 text-sm mb-1">
              <div className="flex">
                <span
                  className="border border-white p-2 rounded-4xl mr-2 cursor-pointer hover:bg-black transition"
                  onClick={handleBackBtn}
                >
                  <FaArrowLeft size={15} />
                </span>
                <span className="bg-emerald-600 px-3 py-1 rounded-full">
                  {eachData.Organizer} Event
                </span>
                <span className="bg-blue-600 px-3 py-1 ml-2 rounded-full">
                  {eachData.EventType}
                </span>
              </div>

              <span
                onClick={handleSaveBtn}
                className={`${
                  isSaved ? "bg-white text-black" : "bg-black text-white"
                } px-3 cursor-pointer py-1 rounded-full`}
              >
                <FaRegBookmark size={20} />
              </span>
            </div>

            <h1 className="text-4xl font-bold mt-2">{eachData.EventTitle}</h1>
            <p className="text-gray-400 pt-1">
              👤 Organized by {eachData.OrganisationName}
            </p>
          </div>

          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="flex items-center gap-2 text-gray-300">
                      <FaCalendarAlt /> Start Date
                    </p>
                    <p>{formatDate(eachData.StartDate)}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-gray-300">
                      <FaCalendarAlt /> End Date
                    </p>
                    <p>{formatDate(eachData.EndDate)}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-gray-300">
                      <FaMapMarkerAlt /> Location
                    </p>
                    <p>
                      {eachData.Venue}, {eachData.City}, {eachData.State}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-gray-300">
                      <FaTrophy /> Prize Pool
                    </p>
                    <p className="text-yellow-400">
                      ₹ {eachData.PricePool}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                <p className="text-gray-300">{eachData.EventDescription}</p>
              </div>

              <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-semibold mb-3">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {eachData.SpecifiedStacks &&
                    eachData.SpecifiedStacks.split(",").map((stack, index) => (
                      <span
                        key={index}
                        className="bg-blue-700 px-4 py-1 rounded-full text-sm"
                      >
                        {stack.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-semibold mb-2">Registration</h2>
                <p className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <FaClock /> Deadline: {DeadLineDate(eachData.EndDate)}
                </p>

                {!isRegistrationOpen ? (
                  <div
                    onClick={handleApplyNow}
                    className="w-full text-center bg-gradient-to-r from-blue-600 to-blue-800 py-2 rounded-lg cursor-pointer"
                  >
                    Apply Now
                  </div>
                ) : (
                  <button className="w-full bg-gray-700 py-2 rounded-lg cursor-not-allowed">
                    Expires
                  </button>
                )}
              </div>

              <div className="bg-[#16161a] p-5 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-semibold mb-3">Event Statistics</h2>
                <p className="text-sm">
                  Duration:{" "}
                  {Math.floor(
                    (new Date(eachData.EndDate) -
                      new Date(eachData.StartDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  Days
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen justify-center items-center">
          <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
};

export default EachEventDetails;

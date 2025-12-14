import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AllEventsPage from "./AllEventsPage";
import { useNavigate } from "react-router";
import { FaLaptopCode, FaLightbulb, FaProjectDiagram } from "react-icons/fa";

function InputElement() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("All Types");
  const [organizer, setOrganizer] = useState("All Organizers");

  const eventTypes = ["All Types", "Hackathon", "Workshop", "Tech Event", "Competition"];
  const organizers = ["All Organizers", "College", "Government", "TechCompany"];

  const scrollToEvents = () => {
    const section = document.getElementById("events-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };


  const handleProjects = () => {
    navigate("/projects",{replace:true})
  }

  return (
    <div className="bg-[#0b0b0c] text-white px-10 pt-24">
      {/* --------------------- HERO SECTION --------------------- */}
      <div className="flex flex-col justify-center items-center md:px-16 text-center text-white animate-fadeIn min-h-[80vh]">

        <h1 className="text-4xl font-bold mb-4 animate-slideUp">
          Welcome to <span className="text-blue-400">HackNext</span>
        </h1>

        <p className="text-gray-300 text-lg max-w-3xl animate-slideUp">
          HackNext helps students discover  
          <span className="font-semibold text-blue-300"> Hackathons, Workshops, and Tech Events</span>{" "}
          organized by  
          <span className="text-green-300 font-semibold"> Colleges, Universities, Government Departments</span>{" "}
          and  
          <span className="text-yellow-300 font-semibold"> Tech Companies</span>.
        </p>

        <p className="text-gray-400 mt-3 max-w-2xl animate-slideUp">
          Explore events, learn new skills, collaborate with peers, and apply directly from this platform 
          with verified details — dates, venues, prize pools, skills required, and more.
        </p>

        <div className="flex flex-col animate-slideUp mt-4">
           <p className="text-gray-300 flex gap-2">
            <FaLaptopCode className="text-blue-400" size={20} />
              HackNext also provides beginner-friendly 
              <span className="text-purple-300 font-semibold"> Web Projects</span> 
              to help students build practical development experience.
            </p>
        </div>
       


        <div className="flex gap-4 mt-6 animate-slideUp">

          <button
            onClick={scrollToEvents}
            className="px-6 py-3 cursor-pointer bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <FaLightbulb size={18} />
            Explore Events
          </button>

          <button
            className="px-6 py-3 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-lg font-semibold transition flex items-center gap-2"
            onClick={handleProjects}
          >
            <FaProjectDiagram size={18} />
            Browse Projects
          </button>

        </div>

      </div>

      {/* --------------------- EXPLORE EVENTS HEADER --------------------- */}
      <div className="flex flex-col gap-2 mb-6 pt-20" id="events-section">
        <h1 className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Explore
          </span>{" "}
          Events
        </h1>
        <p className="text-gray-400 text-sm">
          Discover hackathons, workshops, and tech events happening in India
        </p>
      </div>

      {/* --------------------- FILTER SECTION --------------------- */}
      <div className="flex flex-wrap items-center gap-4 mb-8">

        {/* Search Bar */}
        <div className="flex items-center bg-[#141416] rounded-lg px-3 py-2 w-full md:w-[500px] border border-gray-800">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search events, tags, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
          />
        </div>

        {/* Event Type Dropdown */}
        <div className="relative">
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="bg-[#141416] text-gray-300 px-4 py-2 rounded-lg border border-gray-800 text-sm cursor-pointer"
          >
            {eventTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Organizer Dropdown */}
        <div className="relative">
          <select
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className="bg-[#141416] text-gray-300 px-4 py-2 rounded-lg border border-gray-800 text-sm cursor-pointer"
          >
            {organizers.map((org, idx) => (
              <option key={idx} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* --------------------- EVENTS LIST --------------------- */}
      <AllEventsPage 
        searchQuery={searchQuery} 
        eventType={eventType} 
        organizer={organizer} 
      />

    </div>
  );
}

export default InputElement;

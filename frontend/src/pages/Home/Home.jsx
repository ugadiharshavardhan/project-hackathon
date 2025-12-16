import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [registeredData, setRegisteredData] = useState([]);

  const handleUserEvents = () => {
    navigate("/signin");
  };

  const handleUserEvent = () => {
    navigate("/signup")
  }

  const handleAdminEvents = () => {
    const adminToken = Cookies.get("admin_token");
    if (adminToken !== undefined) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://project-hackathon-7utw.onrender.com/publicdata";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setAllEvents(data.event);
      setRegisteredData(data.register);
    };
    fetchData();
  }, []);

  const ActiveEvents = allEvents.length;
  let prizePool = 0;
  let registered = 0;

  allEvents.forEach((item) => {
    prizePool += parseInt(item.PricePool || 0);
  });

  registeredData.forEach((item) => {
    registered += parseInt(item.membersCount || 0);
  });

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      
      <div className="z-10 text-white min-h-screen flex flex-col items-center justify-center px-6 relative bg-[#070b1e] overflow-hidden">

        <div className="absolute inset-0 -z-10">
          <div
            className="absolute bottom-[-35%] left-1/2 -translate-x-1/2
            w-[1200px] h-[1200px] rounded-full
            bg-[radial-gradient(circle,_rgba(168,85,247,0.95)_0%,_rgba(168,85,247,0.45)_30%,_rgba(15,23,42,0)_65%)]
            blur-[90px]"
          />

          <div
            className="absolute top-[-25%] left-[60%]
            w-[900px] h-[900px] rounded-full
            bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_0%,_rgba(15,23,42,0)_60%)]
            blur-[120px]"
          />
        </div>

        <button onClick={handleUserEvents} className="cursor-pointer mt-1 absolute top-6 right-35 border border-transparent font-bold text-center text-sm tracking-wide text-gray-300">
          sign in 
        </button>

        <h1 className="absolute top-6 left-10 text-3xl font-bold">&lt;/&gt;</h1>

         <button onClick={handleUserEvent} className="cursor-pointer font-bold border-2 border-white text-center rounded-xl pb-2 pt-1 pl-2 pr-1 absolute top-6 right-10 text-sm tracking-wide text-gray-300">
          sign up →
        </button>

        <div className="mt-4">
          <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
            🚀 Discover Your Next Tech Adventure
          </button>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-center mt-10">
          <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
            HackNext
          </span>
        </h1>

        <p className="text-gray-300/80 text-lg md:text-xl text-center mt-6 max-w-2xl leading-relaxed">
          Your gateway to hackathons, workshops, and tech competitions. Connect
          with opportunities, build amazing projects, and advance your career.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleUserEvents}
            className="px-7 py-3 rounded-lg bg-white text-black font-semibold
            hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-600/30"
          >
            Explore Events →
          </button>

          <button
            onClick={handleAdminEvents}
            className="px-7 py-3 rounded-lg bg-black/40 border border-white/10
            hover:bg-black/60 hover:scale-105 transition-transform duration-300"
          >
            Admin Community
          </button>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center
          bg-violet-950 backdrop-blur-md px-1 py-8 rounded-2xl border pr-2 border-white/10"
        >
          <div>
            <div className="text-white text-3xl font-bold">
              {ActiveEvents}+
            </div>
            <p className="text-gray-400 mt-2">Active Events</p>
          </div>

          <div>
            <div className="text-white text-3xl font-bold">
              {registered}+
            </div>
            <p className="text-gray-400 mt-2">Registered Students</p>
          </div>

          <div>
            <div className="text-white text-3xl font-bold">
              ₹ {prizePool}+
            </div>
            <p className="text-gray-400 mt-2">Total Prize Pool</p>
          </div>

          <div>
            <div className="text-white text-3xl font-bold">94%</div>
            <p className="text-gray-400 mt-2">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

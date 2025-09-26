import React from 'react'
// import Cookies from "js-cookie"
import { useNavigate } from "react-router"

const Home = () => {


  const navigate = useNavigate()
  // const jwtToken = Cookies.get("jwt_token")
  // if (jwtToken===undefined) {
  //   return <Navigate to="/login" />
  // }

  // const handleLogout = () => {
  //   if(jwtToken) {
  //     Cookies.remove("jwt_token")
  //     navigate("/login",{replace:true})
  //   }
  // }

  const handleUserEvents = () => {
    navigate("/login")
  }

  const handleAdminEvents = () => {
    navigate("/admin/login")
  }

  return (
    <div className="bg-[#0d0d1a] text-white min-h-screen flex flex-col items-center justify-center px-6">
      {/* Top button */}
      <div className="mt-4">
        <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
          🚀 Discover Your Next Tech Adventure
        </button>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-center mt-8">
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Student Tech Events
        </span>{" "}
        <span className="block text-white">Hub</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-lg md:text-xl text-center mt-6 max-w-2xl">
        Your gateway to hackathons, workshops, and tech competitions. Connect
        with opportunities, build amazing projects, and advance your career.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button onClick={handleUserEvents} className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition cursor-pointer">
          Explore Events →
        </button>
        <button onClick={handleAdminEvents} className="px-6 py-3 rounded-md bg-black border border-gray-700 hover:bg-gray-800 transition cursor-pointer">
          Admin Community
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
        <div>
          <div className="text-purple-400 text-3xl font-bold">190+</div>
          <p className="text-gray-400 mt-2">Active Events</p>
        </div>
        <div>
          <div className="text-purple-400 text-3xl font-bold">45K+</div>
          <p className="text-gray-400 mt-2">Registered Students</p>
        </div>
        <div>
          <div className="text-purple-400 text-3xl font-bold">$7M+</div>
          <p className="text-gray-400 mt-2">Total Prize Pool</p>
        </div>
        <div>
          <div className="text-purple-400 text-3xl font-bold">94%</div>
          <p className="text-gray-400 mt-2">Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

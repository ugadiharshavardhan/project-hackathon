// import React from 'react'
// import Cookies from "js-cookie"
// import { useNavigate } from "react-router"
// import LiquidChrome from '../../components/LiquidChrome';

// const Home = () => {


//   const navigate = useNavigate()

//   // Cookies.remove("admin_token")

//   const handleUserEvents = () => {
//     navigate("/signin")
//   }

//   const handleAdminEvents = () => {
//     const adminToken = Cookies.get("admin_token")
//     console.log(adminToken)
//     if (adminToken!==undefined) {
//       navigate("/admin/dashboard")
//     }
//     else {
//       navigate("/admin/login")
//     }
//   }

//   return (
//     <div style={{ width: '100%', height: '600px', position: 'relative' }}>
//       <LiquidChrome 
//           baseColor={[0.1, 0.1, 0.1]}
//           speed={1}
//           amplitude={0.6}
//           interactive={true}
//           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
//         />
//       <div className='absolute inset-0 z-0'>
//       </div>
//       <div className="bg-[#0d0d1a] z-10 text-white min-h-screen flex flex-col items-center justify-center px-6 relative">
//       {/* Top button */}
//         <div className="mt-4">
//           <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
//             🚀 Discover Your Next Tech Adventure
//           </button>
//           {/* <button onClick={handleLogout}>Logout</button> */}
//         </div>

//         {/* Title */}
//         <h1 className="text-5xl md:text-6xl font-bold text-center mt-8">
//           <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
//             Student Tech Events
//           </span>{" "}
//           <span className="block text-white">Hub</span>
//         </h1>

//         {/* Subtitle */}
//         <p className="text-gray-400 text-lg md:text-xl text-center mt-6 max-w-2xl">
//           Your gateway to hackathons, workshops, and tech competitions. Connect
//           with opportunities, build amazing projects, and advance your career.
//         </p>

//         {/* Buttons */}
//         <div className="mt-8 flex gap-4">
//           <button onClick={handleUserEvents} className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition cursor-pointer">
//             Explore Events →
//           </button>
//           <button onClick={handleAdminEvents} className="px-6 py-3 rounded-md bg-black border border-gray-700 hover:bg-gray-800 transition cursor-pointer">
//             Admin Community
//           </button>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
//           <div>
//             <div className="text-purple-400 text-3xl font-bold">190+</div>
//             <p className="text-gray-400 mt-2">Active Events</p>
//           </div>
//           <div>
//             <div className="text-purple-400 text-3xl font-bold">45K+</div>
//             <p className="text-gray-400 mt-2">Registered Students</p>
//           </div>
//           <div>
//             <div className="text-purple-400 text-3xl font-bold">$7M+</div>
//             <p className="text-gray-400 mt-2">Total Prize Pool</p>
//           </div>
//           <div>
//             <div className="text-purple-400 text-3xl font-bold">94%</div>
//             <p className="text-gray-400 mt-2">Success Rate</p>
//           </div>
//         </div>
//         </div>
    
//       </div>
    
//   );
// };

// export default Home;
import React from 'react'
import Cookies from "js-cookie"
import { useNavigate } from "react-router"
import LiquidChrome from '../../components/LiquidChrome';

const Home = () => {
  const navigate = useNavigate()

  const handleUserEvents = () => {
    navigate("/signin")
  }

  const handleAdminEvents = () => {
    const adminToken = Cookies.get("admin_token")
    if (adminToken !== undefined) {
      navigate("/admin/dashboard")
    } else {
      navigate("/admin/login")
    }
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      
      {/* LiquidChrome background */}
      {/* <LiquidChrome 
        baseColor={[0.1, 0.1, 0.1]}
        speed={1}
        amplitude={0.6}
        interactive={true}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0 
        }}
      /> */}

      {/* Main content */}
      <div className=" z-10 text-white bg-violet-950 min-h-screen flex flex-col items-center justify-center px-6 relative">
        
        {/* Top button */}
        <div className="mt-4">
          <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
            🚀 Discover Your Next Tech Adventure
          </button>
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
    </div>
  );
};

export default Home;


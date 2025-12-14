// import React from "react";
// import { FaCalendarAlt, FaUsers, FaTrophy, FaChartLine, FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router";
// import { FaCodeBranch } from "react-icons/fa";

// export default function UserOverView() {
//     const navigate = useNavigate();
//     const handleAllEvents = () => {
//         navigate("/user/allevents",{replace:true})
//     }

//     const handleReturnHome = () => {
//       navigate("/",{replace:true})
//     }
//   return (
//     <div className="bg-[#0a0a12] text-white min-h-screen flex flex-col items-center justify-center px-6 pt-15">
//       {/* Top Tag */}
//       <div className="mt-10">
//         <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-sm px-4 py-2 rounded-full">
//           🚀 Discover Your Next Tech Adventure
//         </button>
//       </div>

//       {/* Heading */}
//       <h1 className="text-6xl font-bold text-center mt-8">
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
//           Student Events Hub
//         </span>
//       </h1>

//       {/* Subtitle */}
//       <p className="text-gray-400 text-center mt-4 max-w-2xl">
//         Your gateway to hackathons, workshops, and tech competitions. Connect
//         with opportunities, build amazing projects, and advance your career.
//       </p>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-8">
//         <button onClick={handleAllEvents} className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-md text-white font-semibold hover:opacity-90 transition">
//           Explore Events →
//         </button>
//         <button onClick={handleReturnHome} className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-md text-white font-semibold hover:opacity-90 transition">
//           <div className="flex">
//             <FaHome size={26} className="pr-2" /> 
//             <span>Back to Home</span> 
//           </div>
//         </button>
//       </div>

//       {/* Stats Section */}
//       <div className="flex flex-wrap justify-center gap-16 mt-16 text-center">
//         <div>
//           <div className="flex justify-center mb-2">
//             <FaCalendarAlt className="text-purple-400 text-3xl" />
//           </div>
//           <h3 className="text-3xl font-bold">//</h3>
//           <p className="text-gray-400">Hackathons</p>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             <FaUsers className="text-purple-400 text-3xl" />
//           </div>
//           <h3 className="text-3xl font-bold">//</h3>
//           <p className="text-gray-400">Workshops</p>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             <FaTrophy className="text-purple-400 text-3xl" />
//           </div>
//           <h3 className="text-3xl font-bold">//</h3>
//           <p className="text-gray-400">Tech Events</p>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             {/* <FaChartLine /> */}
//             <FaCodeBranch className="text-purple-400 text-3xl" />
//           </div>
//           <h3 className="text-3xl font-bold">//</h3>
//           <p className="text-gray-400">Projects</p>
//         </div>
//       </div>

//       {/* Event Categories Section
//       <div className="mt-24 text-center">
//         <h2 className="text-3xl font-bold">
//           Explore{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
//             Event Categories
//           </span>
//         </h2>
//         <p className="text-gray-400 mt-3">
//           Find the perfect events that match your interests and career goals
//         </p>
//       </div> */}
//     </div>
//   );
// }

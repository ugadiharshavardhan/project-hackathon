// import React from 'react'
// import Cookies from "js-cookie"
// import { Navigate, useNavigate } from 'react-router'
// import { useState } from 'react'
// import { FaCode } from "react-icons/fa";
// import { FaAngleLeft } from "react-icons/fa";
// import toast from 'react-hot-toast';

// function AdminLogin() {
//   const navigate = useNavigate()
//   const [email,setEmail] = useState("")
//   const [code,setCode] = useState("")
//   const [isErr,setIsErr] = useState(false)
//   const [showErrorMsg,setShowErrMsg] = useState("")


//   const onSuccessData = (adminToken) =>{ 
//     Cookies.set("admin_token",adminToken,{expires:7})
//     setIsErr(false)
//     navigate("/admin/dashboard",{replace:true})
//     toast.success("Login Successfully", {
//       duration: 2000,
//     });


//   }
  
//   const AdminToken = Cookies.get("admin_token")
//   if (AdminToken!==undefined) {
//     return <Navigate to="/admin/dashboard" replace />
//   }

//   const onFailueData = () => {
//     setIsErr(true)
//     setShowErrMsg("Invalid Email and Code")
//     toast.error("Invalid Credentials", {
//       duration: 2000,
//     });
//   }

//   const handleSubmitForm = async(event) =>{
//     event.preventDefault()

//     const url = "https://project-hackathon-7utw.onrender.com/admin/login"
//     const AdminDetails = {
//       email,
//       code
//     }
//     const options = {
//       method:"POST",
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify(AdminDetails)
//     }
//     const response = await fetch(url,options);
//     if (response.ok===true) {
//       const data = await response.json()
//       onSuccessData(data.adminToken)
//       console.log(data)
//     }
//     else {
//       onFailueData()
//     }

//   }

//   const handleEmail = (e) => {
//     setEmail(e.target.value)
//   }

//   const handleCode = (e) => {
//     setCode(e.target.value)
//   }

//   const handleHome = () => {
//       navigate("/",{replace:true})
//     }


//    return (
//     <div className="min-h-screen w-full bg-[#023e8a] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6">

//       <div className="absolute inset-0 bg-black/20"></div>

//       <header className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20 flex justify-between">
//          <div className='flex'>
//             <FaCode size={38} className='text-white mt-1' />
//             <h1 className='text-4xl font-bold text-white'>HackNext</h1>
//           </div>
//       </header>


//       <div className="flex">
//         <div>
//           <img className="h-[480px] rounded-l-2xl brightness-130" src="https://res.cloudinary.com/dcttatiuj/image/upload/v1765259528/Screenshot_2025-12-09_112125_ya4frq.png" />
//         </div>
//         <div className="relative z-10 bg-white p-6 sm:p-8 md:p-10 rounded-r-xl w-full max-w-[360px] border border-white/40 ">
//           <h1 className=" text-4xl font-bold text-center mb-2">Admin Login</h1>
//               <p className="text-xs text-center mb-5 mt-3">Hey you can post a Hackathons, Workshops, Tech Events for students</p>
//               <form className="flex flex-col space-y-3" onSubmit={handleSubmitForm}>
//                 {/* Username */}
//                 <div>
//                   <label className="text-black text-xs sm:text-sm font-semibold">EMAIL</label>
//                   <input
//                     type="text"
//                     placeholder="Enter Email"
//                     value={email}
//                     className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     onChange={handleEmail}
//                   />
                  
//                 </div>

//                 <div>
//                   <label className="text-black text-xs sm:text-sm font-semibold">code</label>
//                   <input
//                     type="password"
//                     placeholder="Enter Code"
//                     value={code}
//                     className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     onChange={handleCode}
//                   />
                  
//                 </div>
//                 {isErr ? <p className="text-red-500 text-sm">{showErrorMsg}</p> : "‎"  }
                
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition cursor-pointer"
//                 >
//                   Login
//                 </button>
//                 <div className='flex ' onClick={handleHome}>
//                   <FaAngleLeft className='mt-1.5' />
//                   <p className='cursor-pointer'>back</p>
//                 </div>
//               </form>
//         </div>
//       </div>

//     </div>
//   );


// }

// export default AdminLogin



import React from 'react'
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router'
import { useState } from 'react'
import { FaCode } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import toast from 'react-hot-toast';

function AdminLogin() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [code,setCode] = useState("")
  const [isErr,setIsErr] = useState(false)
  const [showErrorMsg,setShowErrMsg] = useState("")

  const onSuccessData = (adminToken) =>{ 
    Cookies.set("admin_token",adminToken,{expires:7})
    setIsErr(false)
    navigate("/admin/dashboard",{replace:true})
    toast.success("Login Successfully", { duration: 2000 })
  }
  
  const AdminToken = Cookies.get("admin_token")
  if (AdminToken !== undefined) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const onFailueData = () => {
    setIsErr(true)
    setShowErrMsg("Invalid Email and Code")
    toast.error("Invalid Credentials", { duration: 2000 })
  }

  const handleSubmitForm = async(event) =>{
    event.preventDefault()

    const url = "https://project-hackathon-7utw.onrender.com/admin/login"
    const AdminDetails = { email, code }

    const options = {
      method:"POST",
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(AdminDetails)
    }

    const response = await fetch(url,options)
    if (response.ok === true) {
      const data = await response.json()
      onSuccessData(data.adminToken)
    } else {
      onFailueData()
    }
  }

  const handleHome = () => navigate("/",{replace:true})

  return (
    <div className="min-h-screen  w-full bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center px-4">

      {/* Header */}
      <header className="absolute top-6 left-6 flex items-center gap-2">
        <FaCode size={34} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-white tracking-wide">HackNext</h1>
      </header>

      {/* Card */}
      <div className="flex shadow-2xl rounded-2xl overflow-hidden border-1 border-white">

        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src="https://res.cloudinary.com/dcttatiuj/image/upload/v1766123227/ChatGPT_Image_Dec_19_2025_11_16_31_AM_krsl6b.png"
            alt="admin"
            className="h-[500px] w-[360px] object-cover brightness-90"
          />
        </div>

        {/* Right Form */}
        <div className="bg-[#020617] border border-white/10 p-8 w-[360px]">
          <h1 className="text-3xl font-bold text-white text-center">Admin Login</h1>
          <p className="text-xs text-gray-400 text-center mt-2 mb-6">
            Manage Hackathons, Workshops & Tech Events
          </p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmitForm}>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-300 font-semibold">EMAIL</label>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#0f172a] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Code */}
            <div>
              <label className="text-xs text-gray-300 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#0f172a] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {isErr ? (
              <p className="text-red-500 text-sm">{showErrorMsg}</p>
            ) : (
              <span className="text-transparent">.</span>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
            >
              Login
            </button>

            <div
              className="flex items-center gap-1 text-gray-400 hover:text-white cursor-pointer text-sm"
              onClick={handleHome}
            >
              <FaAngleLeft />
              <span>Back to Home</span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

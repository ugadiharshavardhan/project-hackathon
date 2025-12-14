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
    toast.success("Login Successfully", {
      duration: 2000,
    });


  }
  
  const AdminToken = Cookies.get("admin_token")
  if (AdminToken!==undefined) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const onFailueData = () => {
    setIsErr(true)
    setShowErrMsg("Invalid Email and Code")
    toast.error("Invalid Credentials", {
      duration: 2000,
    });
  }

  const handleSubmitForm = async(event) =>{
    event.preventDefault()

    const url = "http://localhost:5678/admin/login"
    const AdminDetails = {
      email,
      code
    }
    const options = {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(AdminDetails)
    }
    const response = await fetch(url,options);
    if (response.ok===true) {
      const data = await response.json()
      onSuccessData(data.adminToken)
      console.log(data)
    }
    else {
      onFailueData()
    }

  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleCode = (e) => {
    setCode(e.target.value)
  }

  const handleHome = () => {
      navigate("/",{replace:true})
    }


   return (
    <div className="min-h-screen w-full bg-[#023e8a] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6">

      <div className="absolute inset-0 bg-black/20"></div>

      <header className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20 flex justify-between">
         <div className='flex'>
            <FaCode size={38} className='text-white mt-1' />
            <h1 className='text-4xl font-bold text-white'>HackNext</h1>
          </div>
      </header>


      <div className="flex">
        <div>
          <img className="h-[480px] rounded-l-2xl brightness-130" src="https://res.cloudinary.com/dcttatiuj/image/upload/v1765259528/Screenshot_2025-12-09_112125_ya4frq.png" />
        </div>
        <div className="relative z-10 bg-white p-6 sm:p-8 md:p-10 rounded-r-xl w-full max-w-[360px] border border-white/40 ">
          <h1 className=" text-4xl font-bold text-center mb-2">Admin Login</h1>
              <p className="text-xs text-center mb-5 mt-3">Hey you can post a Hackathons, Workshops, Tech Events for students</p>
              <form className="flex flex-col space-y-3" onSubmit={handleSubmitForm}>
                {/* Username */}
                <div>
                  <label className="text-black text-xs sm:text-sm font-semibold">EMAIL</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={handleEmail}
                  />
                  
                </div>

                {/* Password */}
                <div>
                  <label className="text-black text-xs sm:text-sm font-semibold">code</label>
                  <input
                    type="password"
                    placeholder="Enter Code"
                    value={code}
                    className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={handleCode}
                  />
                  
                </div>
                {isErr ? <p className="text-red-500 text-sm">{showErrorMsg}</p> : "‎"  }
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition cursor-pointer"
                >
                  Login
                </button>
                <div className='flex ' onClick={handleHome}>
                  <FaAngleLeft className='mt-1.5' />
                  <p className='cursor-pointer'>back</p>
                </div>
              </form>
        </div>
      </div>

    </div>
  );


}

export default AdminLogin

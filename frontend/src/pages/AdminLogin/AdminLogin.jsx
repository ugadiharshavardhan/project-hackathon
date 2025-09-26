import React from 'react'
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router'
import { useState } from 'react'

function AdminLogin() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [code,setCode] = useState("")
  const [isErr,setIsErr] = useState(false)
  const [showErrorMsg,setShowErrMsg] = useState("")


  const onSuccessData = (adminToken) =>{ 
    Cookies.set("admin_token",adminToken,{expires:1})
    setIsErr(false)
    navigate("/admin/dashboard",{replace:true})

  }

  const onFailueData = () => {
    setIsErr(true)
    setShowErrMsg("Invalid Email and Code")
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
    <div>
      <div className="min-h-screen w-full bg-[url('https://previews.123rf.com/images/olgazhurba/olgazhurba1805/olgazhurba180500014/101212078-technology-background-and-abstract-digital-tech-circle-with-various-technological-elements.jpg')] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Header Logo (Image) */}
        <header className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20 flex justify-between">
          <img
            src="https://res.cloudinary.com/dcttatiuj/image/upload/v1758623710/Gemini_Generated_Image_xbel9lxbel9lxbel_uizbkz.png"  
            alt="Movies Logo"
            className="h-10 sm:h-12 w-auto"
          />
          <button onClick={handleHome} className="border-2 bg-white p-2 rounded-lg cursor-pointer">back</button>
        </header>

        {/* Login Box */}
        <div className="relative z-10 bg-black/60 p-6 sm:p-8 md:p-10 rounded-xl w-full max-w-[360px] border border-blue-600 shadow-lg">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Admin Login</h1>
          
          <form className="flex flex-col space-y-5" onSubmit={handleSubmitForm}>
            {/* Username */}
            <div>
              <label className="text-white text-xs sm:text-sm font-semibold">EMAIL</label>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                className="w-full p-3 mt-1 bg-gray-800/80 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleEmail}
              />
              
            </div>

            {/* Password */}
            <div>
              <label className="text-white text-xs sm:text-sm font-semibold">CODE</label>
              <input
                type="password"
                placeholder="Enter password"
                value={code}
                className="w-full p-3 mt-1 bg-gray-800/80 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleCode}
              />
              
            </div>
            {isErr ? <p className="text-red-500 text-sm">{showErrorMsg}</p> : '' }
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

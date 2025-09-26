import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router";
import Cookies from "js-cookie"

export default function SignUp() {

    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showErrorMsg,setShowErrMsg] = useState('')
    const [isErr,setIsErr] = useState(false)


    const handleUsername = (e) => {
      setUserName(e.target.value)

    }
    const handleEmail = (e) => {
      setEmail(e.target.value)
    }
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }

    const onSubmitSuccess = () => {
      navigate("/login",{replace:true})
    }

    const onSubmitFailure = (error) => {
      setIsErr(true)
      setShowErrMsg(error)
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        const userDetails = {
            username,
            email,
            password
        }
        let url = "http://localhost:5678/signup"
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userDetails)
        };

        const response = await fetch(url, options);
        const data = await response.json()
        if(response.ok===true) {
          onSubmitSuccess()
        }
        else{
          onSubmitFailure(data.message)
        }

        console.log(data)
        console.log(showErrorMsg)


    }
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken!==undefined){
      return <Navigate to="/" />
    }

    return (
      <div className="min-h-screen w-full bg-[url('https://media.gettyimages.com/id/668544908/video/abstract-circuit-board-background.jpg?s=640x640&k=20&c=6hmntr0wrjxhc5ZWcgvGcAOC3hF3tYvOZMN9OSE4PqM=')] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Header Logo (Image) */}
        <header className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20">
          <img
            src="https://res.cloudinary.com/dcttatiuj/image/upload/v1758623710/Gemini_Generated_Image_xbel9lxbel9lxbel_uizbkz.png"  
            alt="Movies Logo"
            className="h-30 shadow:lg sm:h-12 w-auto"
          />
        </header>

        {/* Login Box */}
        <div className="relative z-10 bg-black/50 p-6 sm:p-8 md:p-10 rounded-xl w-full max-w-[360px] border border-blue-800 shadow-lg">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Register</h1>
          
          <form className="flex flex-col space-y-5" onSubmit={handleSubmitForm}>
            {/* Username */}
            <div>
              <label className="text-gray-300 text-xs sm:text-sm font-semibold">FULL NAME</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={username}
                className="w-full p-3 mt-1 bg-gray-800/80 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleUsername}
              />
              
            </div>

            <div>
              <label className="text-gray-300 text-xs sm:text-sm font-semibold">EMAIL</label>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                className="w-full p-3 mt-1 bg-gray-800/80 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleEmail}
              />
              
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-xs sm:text-sm font-semibold">PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                className="w-full p-3 mt-1 bg-gray-800/80 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handlePassword}
              />
              
            </div>
            {isErr && (
              <p className="text-red-500 text-sm mt-2">
                {showErrorMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition cursor-pointer"
            >
              Create Account
            </button>
          </form>
          <p className="text-white pt-5">Already have an Account ? <Link to={"/login"} className="underline">login</Link></p>
        </div>
      </div>
    );
}

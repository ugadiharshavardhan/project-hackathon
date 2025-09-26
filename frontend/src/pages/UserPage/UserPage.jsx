import React from 'react'
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router'

function UserPage() {
  const navigate = useNavigate()
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken===undefined) {
        return <Navigate to="/login" />
    }
    const handleLogout = () => {
        Cookies.remove("jwt_token")
        navigate("/login",{replace:true})
    }
  return (
    <div>
      <h1>HeroPage</h1>
      <button className='border-2 bg-red-400 cursor-pointer' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserPage;

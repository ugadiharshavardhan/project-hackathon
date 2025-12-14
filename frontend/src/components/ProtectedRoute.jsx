import React from 'react'
import { Navigate } from 'react-router'
import Cookies from "js-cookie"
import UserNavbar from './UserNavbar'

function ProtectedRoute({children}) {
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken==undefined) {
        return <Navigate to={"/signin"} />
    }
  return (
    <div>
        <UserNavbar />
        {children}
        
    </div>
  )
}

export default ProtectedRoute

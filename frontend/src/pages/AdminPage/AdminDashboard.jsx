import React, { useState } from 'react'
import Cookies from "js-cookie"
import Form from '../../components/Form';
import { Navigate, useNavigate } from 'react-router'
import MyEvents from '../../components/MyEvents';
import AdminOverView from '../../components/AdminOverView';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [form,setForm] = useState(false)
  const adminToken = Cookies.get("admin_token")
  if(adminToken==undefined) {
      return <Navigate to="/admin/login" />
  }

  const handleLogout =()=> {
    Cookies.remove("admin_token")
    navigate("/admin/login",{replace:true})
  }

  const handleCreateEvent = () => {
      setForm(true)
  }

  const handleMyEvents = () => {
    setForm(false)
  }


  return (
    <div className="min-h-screen bg-black text-white px-10 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Admin </span>
          <span className="text-blue-500">Dashboard</span>
        </h1>
        <p className="text-gray-400">Manage your events and registrations</p>
        <button onClick={handleLogout} className='border-2 bg-green-500'>Logout</button>
      </div>
      <AdminOverView />
      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={handleMyEvents} className="px-6 py-2 bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition">
          My Events
        </button>
        <button onClick={handleCreateEvent} className="px-6 py-2 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
          + Create Event
        </button>
      </div>
      {form ? <Form />:<MyEvents />}
    </div>
  );
};

export default AdminDashboard;

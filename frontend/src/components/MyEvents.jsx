import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function MyEvents() {
    const [MyEventsdata,setMyEventsdata] = useState([])
    useEffect(()=> {
        const myEventsData = async() => {
            const url = "http://localhost:5678/events"
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const response = await fetch(url,options)
            const data = await response.json()
            setMyEventsdata(data.allevents)
            console.log(data.allevents)
        }
        myEventsData()
    },[])
  return (
    <div>
      <ul className='flex flex-col items-start'>
        {MyEventsdata.map((each,id)=>(
            <li key={id} className='m-2 w-full'>
                <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">{each.EventTitle}</h2>
                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                                Verified
                            </span>
                        </div>
                        <div className="flex gap-2 text-gray-400">
                            <button className="hover:text-white">
                                <FiEdit size={18} />
                            </button>
                            <button className="hover:text-white">
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 text-xs mb-2">
                        <span className="bg-gray-700 px-2 py-0.5 rounded-full">{each.EventType}</span>
                        <span className="bg-gray-700 px-2 py-0.5 rounded-full">{each.Organizer}</span>
                    </div>

                    {/* Description
                    <p className="text-gray-300 mb-4">
                        Stanford's premier hackathon bringing together the brightest minds to build innovative solutions for pressing global challenges.
                    </p> */}

                    {/* Info */}
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                        <div className="flex items-center gap-1">
                            <FaCalendarAlt /> <span>Feb 14, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaMapMarkerAlt /> <span>{each.city}, {each.state}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaTrophy /> <span>{each.PricePool}</span>
                        </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex gap-2">
                        <ul className='flex gap-2'>
                            {each.SpecifiedStacks.split(",").map((i,index)=>(
                                <li key={index} className="bg-blue-600 px-3 py-1 rounded-full text-xs">{i}</li>        
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default MyEvents

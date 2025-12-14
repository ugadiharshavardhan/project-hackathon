import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"

function SavedEvents() {
  const [events,setEvents] = useState("")
  const [Data,setData] = useState([])

  useEffect(()=> {
    const fetchSaved = async() => {
      const url = "http://localhost:5678/user/savedevents"
      const options = {
        method :"GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${Cookies.get("jwt_token")}`
        }
      }
      const response = await fetch(url,options)
      const data = await response.json();
      // console.log(data.events)
      setEvents(data.events)
      
    }
    fetchSaved()
  },[])

  console.log(events)

  // let arr = []

  useEffect(()=> {
    for (let i of events) {
      setData([...events,i.eventid])
    }
  },[events])

  console.log(Data)

 
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white px-8 py-16 animate-fadeIn">
      <div className="text-center mb-10 pt-15 animate-slideUp">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-400">Saved</span> Events
        </h1>
        <p className="text-gray-400 mt-2">
          Build real-world projects to boost your development skills.
        </p>
      </div>
      <p className="pb-1">Search based on Stacks</p>
      {arr.map((each,index)=> (
        <li className='text-red-500' key={index}>{each.EventTitle}</li>
      ))}
    </div>
  )
}

export default SavedEvents

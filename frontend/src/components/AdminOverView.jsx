import React from 'react'
import { Calendar, CheckCircle, Trophy, BarChart2 } from "lucide-react";

function AdminOverView() {
    const stats = [
    {
      title: "Total Events",
      value: 6,
      icon: <Calendar className="text-purple-500 w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      title: "Verified Events",
      value: 6,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
      color: "text-green-500",
    },
    {
      title: "Hackathons",
      value: 4,
      icon: <Trophy className="text-green-500 w-6 h-6" />,
      color: "text-green-500",
    },
    {
      title: "Upcoming Events",
      value: 0,
      icon: <BarChart2 className="text-yellow-500 w-6 h-6" />,
      color: "text-yellow-500",
    },
  ];
  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
          >
            {item.icon}
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
            <p className="text-gray-400 text-sm">{item.title}</p>
          </div>
        ))}
      </div>
  )
}

export default AdminOverView

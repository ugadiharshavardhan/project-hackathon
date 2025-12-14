import React, { useEffect, useState, useContext } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import CounterContext from "../contextApi/TotalCountsContext";
import Cookies from "js-cookie";
import { FaRegCalendarAlt } from "react-icons/fa";

function MyEvents({ setForm, dropValue }) {
  const [MyEventsdata, setMyEventsdata] = useState([]);
  const [Projectdata, setProjectData] = useState([]);
  const { setCount } = useContext(CounterContext);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5678/events/my", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("admin_token")}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          console.error("Error fetching events:", data.message);
          setMyEventsdata([]);
          return;
        }

        setMyEventsdata(data.events || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setMyEventsdata([]);
      }
    };
    fetchEvents();
  }, []);

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5678/projects", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("admin_token")}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          console.error("Error fetching projects:", data.message);
          setProjectData([]);
          return;
        }

        setProjectData(data.events || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setProjectData([]);
      }
    };
    fetchProjects();
  }, []);

  // Count Update
  useEffect(() => {
    setCount(MyEventsdata.length);
  }, [MyEventsdata]);


  // Delete Event
  const handleDeleteEachItem = async (id) => {
    const res = await fetch(`http://localhost:5678/events/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("admin_token")}`,
      },
    });
    if (res.ok) {
      setMyEventsdata((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert("Delete Event Failed");
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    const res = await fetch(`http://localhost:5678/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("admin_token")}`,
      },
    });
    if (res.ok) {
      setProjectData((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert("Delete Project Failed");
    }
  };

  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[date.getMonth()]} ${day}, ${date.getFullYear()}`;
  };


  const EventCard = ({ each }) => (
    <li className="m-2 w-full">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{each.EventTitle}</h2>
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">{each.Organizer}</span>
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">{each.EventType}</span>
          </div>

          <div className="flex gap-2 text-gray-400">
            <button
              className="hover:text-white"
              onClick={() => setForm({ open: true, event: each, id: each._id })}
            >
              <FiEdit size={18} />
            </button>

            <button
              onClick={() => handleDeleteEachItem(each._id)}
              className="hover:text-white cursor-pointer"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex">
          <span className="m-1"><FcAbout /></span>
          <p className="text-gray-400 text-sm mb-4">{each.EventDescription}</p>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
          <FaCalendarAlt />
          <span>{formatDate(each.StartDate)} - {formatDate(each.EndDate)}</span>

          <div className="flex items-center gap-1">
            <FaMapMarkerAlt />
            <span>{each.Venue}, {each.City}, {each.State}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaTrophy />
            <span>{each.PricePool}</span>
          </div>
        </div>

        <ul className="flex gap-2 flex-wrap">
          {each.SpecifiedStacks?.split(",").map((stack, index) => (
            <li key={index} className="bg-blue-600 px-3 py-1 rounded-full text-xs">
              {stack.trim()}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );

  const ProjectCard = ({ each }) => (
    <li className="m-2 w-full">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{each.title}</h2>

          <button onClick={() => handleDeleteProject(each._id)} className="hover:text-white cursor-pointer">
            <FiTrash2 size={18} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">{each.description}</p>

        <ul className="flex gap-2 flex-wrap">
          {each.stack.map((s, index) => (
            <li key={index} className="bg-blue-600 px-3 py-1 rounded-full text-xs">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );

  if (MyEventsdata.length === 0 && dropValue !== "Projects") {
    return (
      <div className="flex flex-col relative top-20 justify-center items-center">
        <FaRegCalendarAlt size={100} />
        <h1 className="text-xl pt-2 font-bold">No Events Created</h1>
      </div>
    );
  }

  return (
    <div>
      {dropValue !== "All Events" ? (
        <>
          {dropValue === "Projects" ? (
            <ul className="flex flex-col items-start">
              {Projectdata.map((each) => <ProjectCard key={each._id} each={each} />)}
            </ul>
          ) : (
            <ul className="flex flex-col items-start">
              {MyEventsdata.filter((e) => e.EventType === dropValue).map((each) => (
                <EventCard key={each._id} each={each} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <div>
          <ul className="flex flex-col items-start">
            {MyEventsdata.map((each) => <EventCard key={each._id} each={each} />)}
          </ul>

          <ul className="flex flex-col items-start">
            {Projectdata.map((each) => <ProjectCard key={each._id} each={each} />)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyEvents;

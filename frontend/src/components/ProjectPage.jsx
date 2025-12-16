import React, { useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaCode,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaServer,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
} from "react-icons/si";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

import { ThreeDot } from "react-loading-indicators";

function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [mainData, setMainData] = useState(projects);
  const [Value, setValue] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const url = "https://project-hackathon-7utw.onrender.com/user/projects";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setProjects(data.events);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };
    fetchProjectData();
  }, []);

  useEffect(() => {
    setMainData(projects);
  }, [projects]);

  // Stack icon mapping
  const stackIcons = {
    HTML: <FaHtml5 className="text-orange-500" />,
    CSS: <FaCss3Alt className="text-blue-500" />,
    JavaScript: <SiJavascript className="text-yellow-400" />,
    React: <FaReact className="text-blue-400" />,
    "API Fetch": <FaCode className="text-gray-300" />,
    LocalStorage: <FaServer className="text-green-300" />,
    "Node.js": <SiNodedotjs className="text-green-500" />,
    Express: <SiExpress className="text-gray-400" />,
    MongoDB: <SiMongodb className="text-green-500" />,
    Socketio: <FaLaptopCode className="text-purple-400" />,
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setValue(input);
    if (input.trim() === "") {
      setMainData(projects);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const input = Value.trim();

      if (input !== "") {
        const filtered = projects.filter((each) =>
          each.stack.some((tech) =>
            tech.toLowerCase().includes(input.toLowerCase())
          )
        );
        setMainData(filtered);
      } else {
        setMainData(projects);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white px-8 py-16 animate-fadeIn">
      {loading ? (
        <div className="flex min-h-screen justify-center items-center">
          <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <>
          <div className="text-center mb-10 pt-15 animate-slideUp">
            <h1 className="text-4xl font-bold">
              <span className="text-blue-400">HackNext</span> Projects
            </h1>
            <p className="text-gray-400 mt-2">
              Build real-world projects to boost your development skills.
            </p>
          </div>

          <p className="pb-1">Search based on Stacks</p>
          <div className="flex items-center bg-[#141416] gap-4 rounded-lg px-3 py-3 w-full md:w-[500px] border border-gray-800 animate-slideup">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search stacks of projects"
              value={Value}
              onKeyDown={handleKeyPress}
              onChange={(e) => handleInput(e)}
              className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainData.map((project, id) => (
              <div
                key={id}
                className="bg-[#141416] p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-blue-900/40 
                           transition transform hover:scale-[1.02] animate-slideUp"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      project.level === "Beginner"
                        ? "bg-green-600"
                        : project.level === "Intermediate"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {project.level}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-xs"
                    >
                      {stackIcons[tech]}
                      {tech}
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/projects/${project._id}`);
                  }}
                  className="w-[250px] mt-2 bg-amber-400 cursor-pointer hover:bg-amber-600 py-2 rounded-lg font-semibold transition"
                >
                  View Project
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectsPage;

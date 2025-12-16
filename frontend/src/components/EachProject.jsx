import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Cookies from "js-cookie";

import { FaLaptopCode, FaCode, FaReact, FaHtml5, FaCss3Alt, FaServer, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiMongodb, SiExpress, SiNodedotjs, SiFigma } from "react-icons/si";

function EachProject() {
    const { id } = useParams();
    const [eachProject, setEachProject] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://project-hackathon-7utw.onrender.com/projects/${id}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwt_token")}`
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            setEachProject(data.events);
            setLoading(false);
            console.log(data)
        };
        fetchData();
    }, [id]);

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

    const Eachstack = eachProject.stack || [];

    const functionalityList = eachProject?.functionality?.split(".").map(item => item.trim()).filter(item => item !== "") || [];


    return (
        <div>      
            {loading ? (
                <div className="bg-[#0b0b0c] min-h-screen flex justify-center items-center">
                    <h1 className="text-white">Loading...</h1>
                </div>
            ) : (
                <div className="min-h-screen bg-[#0b0b0c] text-white px-8 py-26 flex justify-center items-start animate-fadeIn">
                    <div className="bg-[#141416] p-6 rounded-xl border border-gray-800 shadow-lg w-[900px] animate-slideUp">

                        {/* TITLE + LEVEL */}
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-semibold">{eachProject.title}</h2>
                            <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                    eachProject.level === "Beginner"
                                        ? "bg-green-600"
                                        : eachProject.level === "Intermediate"
                                        ? "bg-yellow-600"
                                        : "bg-red-600"
                                }`}
                            >
                                {eachProject.level}
                            </span>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-400 text-sm mb-4">
                            {eachProject.description}
                        </p>

                        <h1 className='mb-2 text-xl font-bold'>Functionality of Project</h1>
                        <div className="flex flex-col gap-2 mb-4">
                            {functionalityList.map((line, index) => (
                                <p key={index} className="text-gray-300 text-sm">
                                • {line}.
                                </p>
                            ))}
                            </div>


                        {/* STACK LIST WITH ICON + TEXT */}
                        <ul className="flex gap-2 flex-wrap mt-3 mb-4">
                            {Eachstack.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 bg-[#1d1d1f] px-3 py-1 rounded-xl border border-gray-700"
                                >
                                    <span className="text-lg">
                                        {stackIcons[item] || <FaCode />}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* REFERENCE LINKS */}
                        <div className="flex flex-col mt-4">
                            {(eachProject.gitLink || eachProject.figmaLink) && (
                                <h1 className="text-xl font-bold mb-1">Reference Links</h1>
                            )}

                            {/* Figma Link */}
                            {eachProject.figmaLink && (
                                <div className="flex items-center gap-2 mb-2">
                                    <SiFigma className="text-[#F24E1E] text-xl" />
                                    <a
                                        className="underline"
                                        href={eachProject.figmaLink}
                                        target="__blank"
                                    >
                                        Figma Link &gt;
                                    </a>
                                </div>
                            )}

                            {/* Git Link */}
                            {eachProject.gitLink && (
                                <div className="flex items-center gap-2">
                                    <FaGitAlt className="text-[#F05033] text-xl" />
                                    <a
                                        className="underline"
                                        href={eachProject.gitLink}
                                        target="__blank"
                                    >
                                        Git Repository &gt;
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default EachProject;

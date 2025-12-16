import { useNavigate } from 'react-router'
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function UserNavbar() {
    const navigate = useNavigate()

    const handleRefresh = () => {
      navigate("/",{replace:true})
    }

    const handleUserAccount = () => {
      navigate("/user/account",{replace:true})
    }

    const handleProjects = () => {
      navigate("/projects",{replace:true})
    }

    const handleHome = () => {
      navigate("/user/allevents",{replace:true})
    }

  return (
    <div className="bg-[#111] text-white fixed z-50 w-full">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-black border-b border-gray-800">
        <div onClick={handleRefresh} className="text-2xl font-bold flex cursor-pointer items-center gap-1 text-white transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-600">
          <span className="text-3xl font-bold text-white transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-600">&lt;/&gt;</span> HackNext
        </div>
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-1 cursor-pointer hover:text-purple-500" onClick={handleHome}>
            Home<span className="mt-1"><FaHome /></span>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-purple-500" onClick={handleProjects}>
            Projects<span className="mt-1"><FaEye /></span>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-purple-500" onClick={handleUserAccount}>
            <span className="mt-1"><FaRegUser /></span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default UserNavbar;

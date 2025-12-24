import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaSignInAlt, FaUser, FaBookmark, FaClipboardList } from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";
import SavedEvents from "../../components/SavedEvents";
import Eventsbyuser from "../ApplyedEventsbyuser/Eventsbyuser";
import { useNavigate } from "react-router";

function UserAccount() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        "https://project-hackathon-7utw.onrender.com/user/account",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        }
      );

      const data = await response.json();
      setUserData(data.userDetails);
      setLoading(false);
    };

    fetchAccount();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f1225] to-[#14172e]">
        <ThreeDot color="#6366f1" size="medium" />
      </div>
    );
  }

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/signin", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-950 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-[280px] fixed left-0 top-0 h-screen bg-white/5 border-r border-white/10 backdrop-blur-md flex flex-col justify-between">
        <div className="pt-24 px-4 space-y-2">
          
          <SidebarItem
            icon={<FaUser />}
            label="User Profile"
            active={activeSection === "user"}
            onClick={() => setActiveSection("user")}
          />

          <SidebarItem
            icon={<FaBookmark />}
            label="Saved Events"
            active={activeSection === "saved"}
            onClick={() => setActiveSection("saved")}
          />

          <SidebarItem
            icon={<FaClipboardList />}
            label="Applied Events"
            active={activeSection === "appliedevents"}
            onClick={() => setActiveSection("appliedevents")}
          />
        </div>

        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 py-3 rounded-xl
                     bg-rose-500/20 text-white cursor-pointer
                     hover:bg-rose-500/30 transition"
        >
          <FaSignInAlt />
          Logout
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-[280px] w-full overflow-y-auto">
        <div className="min-h-screen px-6 py-24 flex justify-center">
          <div className="w-full max-w-5xl">

            {activeSection === "user" && (
              <div className="animate-slideUp flex flex-col items-center">
                
                {/* PROFILE CARD */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
                  
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 mx-auto mb-4 rounded-full
                               bg-gradient-to-r from-indigo-500 to-violet-600
                               flex items-center justify-center text-3xl font-bold text-white"
                  >
                    {userData?.username?.[0]?.toUpperCase()}
                  </div>

                 <h2 className="text-2xl font-bold text-white">
                    {userData?.username}
                  </h2>

                  <p className="text-gray-400 mt-1">
                    {userData?.email}
                  </p>


                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-gray-400">Role</p>
                      <p className="font-semibold text-white">Student</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-gray-400">Status</p>
                      <p className="font-semibold text-emerald-400">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "saved" && <SavedEvents />}
            {activeSection === "appliedevents" && <Eventsbyuser />}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
        ${
          active
            ? "bg-gradient-to-r from-indigo-600/30 to-violet-600/30 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default UserAccount;

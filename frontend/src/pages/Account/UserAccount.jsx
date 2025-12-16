import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaSignInAlt } from "react-icons/fa";
import SavedEvents from "../../components/SavedEvents";
import { FaAngleDoubleRight } from "react-icons/fa";
import Eventsbyuser from "../ApplyedEventsbyuser/Eventsbyuser";
import { useNavigate } from "react-router";

function UserAccount() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("user");

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch("http://localhost:5678/user/account", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });

      const data = await response.json();
      setUserData(data.userDetails);
    };

    fetchAccount();
  }, []);

  if (!userData) {
    return <div className="text-white">Loading...</div>;
  }

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/signin", { replace: true });
  };

  return (
    <div className="flex bg-black h-screen overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-[300px] bg-white flex flex-col justify-between fixed left-0 top-0 h-screen">
        <div className="pt-20">
          <h1
            onClick={() => setActiveSection("user")}
            className={`cursor-pointer p-4 font-semibold ${
              activeSection === "user" && "bg-gray-700 text-white"
            }`}
          >
            User
          </h1>

          <h1
            onClick={() => setActiveSection("saved")}
            className={`cursor-pointer p-4 font-semibold ${
              activeSection === "saved" && "bg-gray-700 text-white"
            }`}
          >
            Saved Events
          </h1>

          <h1
            onClick={() => setActiveSection("appliedevents")}
            className={`cursor-pointer p-4  font-semibold ${
              activeSection === "appliedevents" && "bg-gray-700 text-white"
            }`}
          >
            Applied Events
          </h1>
        </div>

        <div
          onClick={handleLogout}
          className="flex items-center gap-2 p-4 bg-gray-400 text-black cursor-pointer"
        >
          <FaSignInAlt /> Logout
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="ml-[300px] w-full flex justify-center items-center bg-black overflow-y-auto">
        <div className="pt-20 px-6">

          {activeSection === "user" && (
            <div className="animate-slideUp flex flex-col justify-center items-center">
              <h1 className="text-2xl text-white font-bold mb-4">
                User Details
              </h1>
              <div className="bg-pink-300 p-5 w-[70px] text-center font-bold rounded-4xl">
                {userData.username[0].toUpperCase()}
              </div>
              <p className="text-white mt-"><span className="font-bold">Name</span>: {userData.username.toUpperCase()}</p>
              <p className="text-white">Email: {userData.email}</p>
            </div>
          )}

          {activeSection === "saved" && <SavedEvents />}
          {activeSection === "appliedevents" && <Eventsbyuser /> }

        </div>
      </main>

    </div>
  );
}

export default UserAccount;

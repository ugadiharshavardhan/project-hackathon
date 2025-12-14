import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaAngleLeft } from "react-icons/fa";
import SavedEvents from "../../components/SavedEvents";

function UserAccount() {
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

  return (
    <div className="flex min-h-screen bg-amber-800">
      
      {/* SIDEBAR */}
      <div className="bg-white pt-20 min-h-screen w-[300px]">
        <h1
          onClick={() => setActiveSection("user")}
          className={`cursor-pointer p-4 ${
            activeSection === "user" && "bg-black text-white"
          }`}
        >
          User
        </h1>

        <h1
          onClick={() => setActiveSection("saved")}
          className={`cursor-pointer p-4 ${
            activeSection === "saved" && "bg-black text-white"
          }`}
        >
          Saved Events
        </h1>
      </div>

      {/* CONTENT */}
      <div className="bg-amber-200 pt-20 w-full min-h-screen px-6">
        {activeSection === "user" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <p>Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}

        {activeSection === "saved" && <SavedEvents />}
      </div>
    </div>
  );
}


export default UserAccount;

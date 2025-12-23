import React from "react";
import SavedEvents from "../../components/SavedEvents";
import UserNavbar from "../../components/UserNavbar";

function UserSavedEvents() {
  return (
    <div>
      <UserNavbar />
      <SavedEvents />
    </div>
  );
}

export default UserSavedEvents;
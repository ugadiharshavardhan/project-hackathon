import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const Form = () => {
  const [formData, setFormData] = useState({
    EventTitle: "",
    EventType: "",
    Organizer: "",
    OnlineorOffline: false,
    PricePool: "",
    OrganisationName: "",
    City: "",
    State: "",
    Venue: "",
    StartDate:"",
    EndDate:"",
    SpecifiedStacks: ""
  });

  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert("Event Created Successfully!");
    const Eventdetails = formData
    console.log(Eventdetails)
    const url = "http://localhost:5678/events/post"
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(Eventdetails)
    }
    const response = await fetch(url,options)
    if (response.ok==true) {
        const data = await response.json();
        console.log(data.message)
    }
    // setFormData(true)
  };

  if (!showForm) {
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-4"
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Event</h2>
          <RxCrossCircled
            className="text-red-500 cursor-pointer"
            size={28}
            onClick={() => setShowForm(false)}
          />
        </div>

        <p className="text-gray-400 mb-4">
          Fill in the details to create a new event
        </p>

        {/* Event Title */}
        <div>
          <label className="block text-sm mb-1">Event Title *</label>
          <input
            type="text"
            name="EventTitle"
            value={formData.EventTitle}
            onChange={handleChange}
            placeholder="Enter event title"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm mb-1">Event Type *</label>
          <select
            name="EventType"
            value={formData.EventType}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            required
          >
            <option value="">Select type</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Tech Event">Tech Event</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        {/* Organizer */}
        <div>
          <label className="block text-sm mb-1">Organizer *</label>
          <select
            name="Organizer"
            value={formData.Organizer}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            required
          >
            <option value="">Select organizer</option>
            <option value="College">College</option>
            <option value="Government">Government</option>
            <option value="TechCompany">Tech Company</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Online or Offline */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="OnlineorOffline"
            checked={formData.OnlineorOffline}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label>Online or Offline Event</label>
        </div>

        {/* Organisation Name + Price Pool */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label>Organization Name</label>
            <input
              type="text"
              name="OrganisationName"
              value={formData.OrganisationName}
              onChange={handleChange}
              placeholder="Enter Organization name"
              className="p-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label>Price Pool</label>
            <input
              type="text"
              name="PricePool"
              value={formData.PricePool}
              onChange={handleChange}
              placeholder="Enter Price pool"
              className="p-2 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>
        </div>

        {/* City, State, Venue */}
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label>City</label>
                <input
                    type="text"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="p-2 rounded-md bg-gray-800 border border-gray-700"
                />
            </div>
            <div>
                <label>State</label>
                <input
                    type="text"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="p-2 rounded-md bg-gray-800 border border-gray-700"
                />
            </div>
            <div>
                <label>Venue</label>
                <input
                    type="text"
                    name="Venue"
                    value={formData.Venue}
                    onChange={handleChange}
                    placeholder="Enter venue"
                    className="p-2 rounded-md bg-gray-800 border border-gray-700"
                />
            </div>
        </div>

        <div className="flex">
            <div className="mr-2 flex flex-col">
                <label>Start Date</label>
                <input
                    type="date"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handleChange}
                    placeholder="Enter venue"
                    className="p-2 rounded-md bg-gray-800 border border-gray-700"
                />
            </div>
            <div className="mr-2 flex flex-col">
                <label>End Date</label>
                <input
                    type="date"
                    name="EndDate"
                    value={formData.EndDate}
                    onChange={handleChange}
                    placeholder="Enter venue"
                    className="p-2 rounded-md bg-gray-800 border border-gray-700"
                />
            </div>
        </div>

        {/* Specified Stacks */}
        <div>
          <label className="block text-sm mb-1">Specified Stacks</label>
          <input
            type="text"
            name="SpecifiedStacks"
            value={formData.SpecifiedStacks}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, AI/ML"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded-md font-bold"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Form;

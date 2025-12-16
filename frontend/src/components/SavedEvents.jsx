import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { ThreeDot } from "react-loading-indicators";


function SavedEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        setLoading(true);

        const url = "https://project-hackathon-7utw.onrender.com/user/savedevents";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching saved events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);
  
  const Data = events.map((each) => each.eventid);

  return (
    <div className="pt-15">
      {
        loading ? (
          <div className="flex min-h-screen justify-center items-center text-red-500 text-xl">
            <ThreeDot color="#ffffff" size="medium" text="" textColor="" />
          </div>

        ) : Data.length === 0 ? (
          <div className="flex min-h-screen flex-col justify-center items-center">
            <h1 className="text-white font-bold text-5xl mb-5">
              No Events
            </h1>
            <img
              src="https://www.pngkey.com/png/full/30-301664_calendar-emblem-events-icon-white-png.png"
              alt="no-events"
              className="h-[50vh]"
            />
          </div>
        ) : (
          <div className="min-h-screen bg-[#0b0b0c] text-white px-8 animate-fadeIn">
            <div className="text-center mb-10 pt-5 animate-slideUp">
              <h1 className="text-4xl font-bold">
                <span className="text-blue-400">Saved</span> Events
              </h1>
              <p className="text-gray-400 mt-2">
                Build real-world projects to boost your development skills.
              </p>
            </div>

            <div className="flex flex-wrap justify-center">
              {Data.map((each) => (
                <div
                  key={each._id}
                  className="flex flex-col rounded-2xl gap-2 m-5 bg-white w-[400px] p-5 items-center mb-3 animate-slideUp"
                >
                  <h1 className="text-black font-bold text-2xl p-3 text-center">
                    {each.EventTitle}
                  </h1>

                  <h2 className="text-xl bg-amber-500 px-3 py-1 rounded-2xl font-semibold">
                    {each.EventType}
                  </h2>

                  <p className="text-black text-sm text-center">
                    Organised By {each.OrganisationName} in {each.City}
                  </p>

                  <p className="text-black">
                    Venue :{" "}
                    <span className="font-bold">{each.Venue}</span>
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/user/allevents/${each._id}`)
                    }
                    className="w-[250px] mt-3 bg-amber-400 hover:bg-amber-600 py-2 rounded-lg font-semibold transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default SavedEvents;

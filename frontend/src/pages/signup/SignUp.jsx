import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FaCode } from "react-icons/fa";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleUsername = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const jwtToken = Cookies.get("jwt_token");

  const onSubmitSuccess = () => {
    navigate("/signin", { replace: true });
    toast.success("Account Created", { duration: 2000 });
  };

  const onSubmitFailure = (error) => {
    setIsErr(true);
    setShowErrMsg(error);
    toast.error("Invalid Credentials", { duration: 2000 });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const userDetails = { username, email, password };

    try {
      const response = await fetch(
        "https://project-hackathon-7utw.onrender.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess();
      } else {
        onSubmitFailure(data.message);
      }
    } catch (error) {
      console.log(error)
      onSubmitFailure("Something went wrong. Try again.");
    }
  };


  useEffect(() => {
    if (jwtToken) {
      toast.success("User already logged in", { id: "already-logged-in" });
    }
  }, [jwtToken]);

  if (jwtToken !== undefined) {
    // toast.success("User already logged in");
    return <Navigate to="/user/allevents" replace />;
  }

  const handleHome = () => navigate("/", { replace: true });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1225] to-[#14172e] relative flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Header */}
      <header onClick={handleHome} className="absolute cursor-pointer top-6 left-6 z-20">
        <div className="flex items-center gap-2">
          <FaCode size={34} className="text-indigo-400" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">HackNext</h1>
        </div>
        <button
          onClick={handleHome}
          className="mt-2 text-sm px-4 py-1 rounded-lg border border-white/20 text-gray-200 hover:border-white/40 transition"
        >
          Back
        </button>
      </header>

      {/* Card Wrapper */}
      <div className="relative z-10 flex shadow-2xl rounded-2xl overflow-hidden flex-col md:flex-row">
        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 w-full max-w-[360px] border border-white/10">
          <h1 className="text-xl md:text-2xl font-bold text-center text-white mb-6">
            Create Account
          </h1>

          <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmitForm}
          >
            {/* Username */}
            <div>
              <label className="text-gray-300 text-xs font-semibold">
                USERNAME
              </label>
              <div className="mt-1 p-[1.5px] rounded-lg bg-white/10 focus-within:bg-gradient-to-r focus-within:from-indigo-500 focus-within:to-violet-600 transition">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter full name"
                  value={username}
                  onChange={handleUsername}
                  className="w-full px-3 py-2 rounded-md bg-[#0f1225] text-gray-200 text-sm outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-xs font-semibold">
                EMAIL
              </label>
              <div className="mt-1 p-[1.5px] rounded-lg bg-white/10 focus-within:bg-gradient-to-r focus-within:from-indigo-500 focus-within:to-violet-600 transition">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmail}
                  className="w-full px-3 py-2 rounded-md bg-[#0f1225] text-gray-200 text-sm outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-xs font-semibold">
                PASSWORD
              </label>
              <div className="mt-1 p-[1.5px] rounded-lg bg-white/10 focus-within:bg-gradient-to-r focus-within:from-indigo-500 focus-within:to-violet-600 transition">
                <input
                  type="password"
                  placeholder="Create new password"
                  value={password}
                  onChange={handlePassword}
                  className="w-full px-3 py-2 rounded-md bg-[#0f1225] text-gray-200 text-sm outline-none"
                />
              </div>
            </div>

            {/* Error */}
            <div className="min-h-[20px]">
              {isErr && (
                <p className="text-rose-400 text-sm">{showErrorMsg}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 py-3 cursor-pointer rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-gray-300 pt-5 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            className="h-full w-full md:w-[420px] object-cover"
            src="https://res.cloudinary.com/dcttatiuj/image/upload/v1766122761/ChatGPT_Image_Dec_19_2025_11_08_15_AM_cupynb.png"
            alt="Signup Visual"
          />
        </div>
      </div>
    </div>
  );
}

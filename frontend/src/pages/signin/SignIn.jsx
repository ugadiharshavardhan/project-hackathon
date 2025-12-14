import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate, Link } from "react-router";
import { FaCode } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 7 });
    setIsErr(false);
    navigate("/user/allevents", { replace: true });
    toast.success("Student Login Successfully", { duration: 2000 });
  };

  const onSubmitFailure = (errorMsg) => {
    setIsErr(true);
    setShowErrMsg(errorMsg);
    toast.error("Invalid Credentials", { duration: 2000 });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };

    const response = await fetch("http://localhost:5678/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();

    if (response.ok === true) onSubmitSuccess(data.jwt_token);
    else onSubmitFailure(data.message);
  };

  const handleHome = () => navigate("/", { replace: true });

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) return <Navigate to="/user/allevents" />;

  return (
    <div className="min-h-screen w-full bg-[#023e8a] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Header */}
      <header className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20 flex">
        <FaCode size={38} className="text-white mt-1" />
        <h1 className="text-4xl font-bold text-white">HackNext</h1>
      </header>

      {/* Main Container */}
      <div className="flex h-[470px]">
        {/* Left Image */}
        <div>
          <img
            className="h-full rounded-l-2xl brightness-170"
            src="https://res.cloudinary.com/dcttatiuj/image/upload/v1764923422/ChatGPT_Image_Dec_5_2025_02_00_01_PM_janplh.png"
            alt="Login Visual"
          />
        </div>

        {/* Right Login Card */}
        <div className="relative z-10 bg-white p-6 sm:p-8 md:p-10 rounded-r-xl w-full max-w-[360px] border border-white/40 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center mb-2">
            Student Login
          </h1>
          <p className="text-xs text-center mb-5 mt-3">
            Hey enter your details to sign in to your account
          </p>

          <form className="flex flex-col space-y-5" onSubmit={handleSubmitForm}>
            {/* Email */}
            <div>
              <label className="text-black text-xs sm:text-sm font-semibold">
                EMAIL
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleEmail}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-black text-xs sm:text-sm font-semibold">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                className="w-full p-2 mt-1 bg-gray-300/80 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handlePassword}
              />
            </div>

            {/* Fixed Height Error Message */}
            <div className="min-h-[20px]">
              {isErr && (
                <p className="text-red-500 text-sm">{showErrorMsg}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-black pt-5">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Signup now
            </Link>
          </p>

          <div className="flex cursor-pointer" onClick={handleHome}>
            <FaAngleLeft className="mt-1.5" />
            <p>back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

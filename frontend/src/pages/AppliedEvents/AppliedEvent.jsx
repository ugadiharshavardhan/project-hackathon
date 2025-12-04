import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function AppliedEvent() {
    const { eventid } = useParams();
    const navigate = useNavigate();
    const [EventDetails,setEventDetails] = useState([])
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ApplyFormData, setApplyFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        institution: "",
        role: "",
        skills: "",
        teamName: "",
        teamLeadName: "",
        membersCount: "",
        ideaDescription: ""
    });

    const validateForm = () => {
        const newErrors = {};
        
        if (!ApplyFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
        
        if (!ApplyFormData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(ApplyFormData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!ApplyFormData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(ApplyFormData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        if (!ApplyFormData.street) newErrors.street = 'Street address is required';
        if (!ApplyFormData.city) newErrors.city = 'City is required';
        if (!ApplyFormData.state) newErrors.state = 'State is required';
        if (!ApplyFormData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!ApplyFormData.institution) newErrors.institution = 'Institution is required';
        if (!ApplyFormData.role) newErrors.role = 'Role is required';
        if (!ApplyFormData.skills) newErrors.skills = 'Skills are required';
        if (!ApplyFormData.teamName) newErrors.teamName = 'Team name is required';
        if (!ApplyFormData.ideaDescription) newErrors.ideaDescription = 'Idea description is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitApply = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const url = `http://localhost:5678/event/apply/${eventid}`;
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwt_token")}`
                },
                body: JSON.stringify({
                    ...ApplyFormData,
                    eventTitle: EventDetails.EventTitle,
                    eventType: EventDetails.EventType,
                    StartDate : EventDetails.StartDate,
                    EndDate : EventDetails.EndDate,
                    Venue:EventDetails.Venue,
                    EventCity:EventDetails.City,
                    eventId: eventid,
                    appliedAt: new Date().toISOString(),
                })
            };

            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Failed to submit application');
                return;
            }
            toast.success("Applied successfully!");
            navigate('/user/allevents');
        } catch (error) {
            console.error('Error submitting application:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDataapply = (e) => {
        const {name,value} = e.target
        if (name === "membersCount") {
            setApplyFormData(prev => ({ ...prev, [name]: Number(value) }));
        } else {
            setApplyFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    useEffect(()=>{
        const fetchEvent = async()=> {
            const url = `http://localhost:5678/user/allevents/${eventid}`
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${Cookies.get("jwt_token")}`
                }
            }
            const response = await fetch(url,options)
            const data = await response.json()
            console.log(data)
            setEventDetails(data)

        }
        fetchEvent()
    },[eventid])
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-lg text-gray-600">Complete your application for {EventDetails.EventTitle || 'the event'}</p>
        </div>

        <form onSubmit={handleSubmitApply} className="space-y-8">
          {/* Personal Information */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-2xl font-bold text-white">Personal Information</h2>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name (First & Last)*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={ApplyFormData.fullName}
                    onChange={handleDataapply}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                  {errors.fullName ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                  ) : ApplyFormData.fullName ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  ) : null}
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={ApplyFormData.email}
                      onChange={handleDataapply}
                      placeholder="john.doe@university.edu"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.email ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.email ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={ApplyFormData.phoneNumber}
                      onChange={handleDataapply}
                      placeholder="1234567890"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.phoneNumber ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.phoneNumber ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-2xl font-bold text-white">Address Information</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Street Address*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="street"
                    value={ApplyFormData.street}
                    onChange={handleDataapply}
                    placeholder="123 Main Street"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.street ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                  {errors.street ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                  ) : ApplyFormData.street ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  ) : null}
                </div>
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={ApplyFormData.city}
                      onChange={handleDataapply}
                      placeholder="Boston"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.city ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.city ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">State / Province*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      value={ApplyFormData.state}
                      onChange={handleDataapply}
                      placeholder="MA"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.state ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.state ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Postal / Zip Code*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="postalCode"
                      value={ApplyFormData.postalCode}
                      onChange={handleDataapply}
                      placeholder="02138"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.postalCode ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.postalCode ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education & Role */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-2xl font-bold text-white">Education & Role</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Institution / Company*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="institution"
                      value={ApplyFormData.institution}
                      onChange={handleDataapply}
                      placeholder="Harvard University"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.institution ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.institution ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.institution ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role / Position*</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="role"
                      value={ApplyFormData.role}
                      onChange={handleDataapply}
                      placeholder="Computer Science Student"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.role ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.role ? (
                      <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                    ) : ApplyFormData.role ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Skills / Expertise*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="skills"
                    value={ApplyFormData.skills}
                    onChange={handleDataapply}
                    placeholder="Web Dev, AI, Blockchain, Design, etc."
                    className={`w-full px-4 py-3 rounded-lg border ${errors.skills ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                  {errors.skills ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                  ) : ApplyFormData.skills ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  ) : null}
                </div>
                <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
              </div>
            </div>
          </motion.div>

          {/* Team Information */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-2xl font-bold text-white">Team Information</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Team Name*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="teamName"
                    value={ApplyFormData.teamName}
                    onChange={handleDataapply}
                    placeholder="e.g., Code Warriors"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.teamName ? 'border-red-500 pr-10' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                  {errors.teamName ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3.5" />
                  ) : ApplyFormData.teamName ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  ) : null}
                </div>
                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Team Lead Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="teamLeadName"
                    value={ApplyFormData.teamLeadName}
                    onChange={handleDataapply}
                    placeholder="Head of the team"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {ApplyFormData.teamLeadName && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Team Size</label>
                <div className="relative">
                  <input
                    type="number"
                    name="membersCount"
                    min="1"
                    max="5"
                    value={ApplyFormData.membersCount}
                    onChange={handleDataapply}
                    placeholder="1-5 members"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {ApplyFormData.membersCount && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3.5" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Idea*</label>
                <div className="relative">
                  <textarea
                    rows="4"
                    name="ideaDescription"
                    value={ApplyFormData.ideaDescription}
                    onChange={handleDataapply}
                    placeholder="Briefly describe your project idea or area of interest..."
                    className={`w-full px-4 py-3 rounded-lg border ${errors.ideaDescription ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  ></textarea>
                  {errors.ideaDescription ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-3" />
                  ) : ApplyFormData.ideaDescription ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-3" />
                  ) : null}
                </div>
                {errors.ideaDescription && <p className="text-red-500 text-sm mt-1">{errors.ideaDescription}</p>}
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] ${
                isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-200'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default AppliedEvent

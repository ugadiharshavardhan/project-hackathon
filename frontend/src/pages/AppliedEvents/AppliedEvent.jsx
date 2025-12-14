import React, { useEffect } from 'react'
import { useState } from 'react';
import Cookies from "js-cookie"
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

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
                    // eventId : EventDetails,
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
            toast.success(`Applied successfully for ${EventDetails.EventTitle}!`);
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

    const handleBackBtn = () => {
        navigate("/user/allevents",{replace:true})
    }

  return (
    <div className='pt-25 bg-gray-500'>
        <span className="border border-black cursor-pointer p-2"
            onClick={handleBackBtn} >
            {/* <FaArrowLeft size={15} /> */}
            back
        </span>
      <form onSubmit={handleSubmitApply} >
        <div className="max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold mb-4">Hackathon Registration Form</h2>
            <div>
                <label className="block mb-1 font-medium">Full Name (First & Last)*</label>
                <input
                    type="text"
                    name="fullName"
                    value={ApplyFormData.fullName}
                    onChange={handleDataapply}
                    placeholder="John Doe"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block mb-1 font-medium">Email Address*</label>
                <input
                    type="email"
                    name="email"
                    value={ApplyFormData.email}
                    onChange={handleDataapply}
                    placeholder="john.doe@university.edu"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                <label className="block mb-1 font-medium">Phone Number*</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={ApplyFormData.phoneNumber}
                    onChange={handleDataapply}
                    placeholder="1234567890"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
            </div>

            {/* Address Block */}
            <div className="border border-gray-700 rounded p-4 space-y-4">
                <p className="font-semibold">Address Information</p>

                <div>
                <label className="block mb-1 font-medium">Street Address*</label>
                <input
                    type="text"
                    name="street"
                    value={ApplyFormData.street}
                    onChange={handleDataapply}
                    placeholder="123 Main Street"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.street ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 font-medium">City*</label>
                    <input
                        type="text"
                        name="city"
                        value={ApplyFormData.city}
                        onChange={handleDataapply}
                        placeholder="Boston"
                        className={`w-full p-2 rounded bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">State / Province*</label>
                    <input
                        type="text"
                        name="state"
                        value={ApplyFormData.state}
                        onChange={handleDataapply}
                        placeholder="MA"
                        className={`w-full p-2 rounded bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-700'}`}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Postal / Zip Code*</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={ApplyFormData.postalCode}
                        onChange={handleDataapply}
                        placeholder="02138"
                        className={`w-full p-2 rounded bg-gray-800 border ${errors.postalCode ? 'border-red-500' : 'border-gray-700'}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
                </div>
            </div>

            {/* Institution & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block mb-1 font-medium">Institution / Company*</label>
                <input
                    type="text"
                    name="institution"
                    value={ApplyFormData.institution}
                    onChange={handleDataapply}
                    placeholder="Harvard University"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.institution ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                </div>

                <div>
                <label className="block mb-1 font-medium">Role / Position*</label>
                <input
                    type="text"
                    name="role"
                    value={ApplyFormData.role}
                    onChange={handleDataapply}
                    placeholder="Computer Science Student"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.role ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>
            </div>

            {/* Skills */}
            <div>
                <label className="block mb-1 font-medium">Skills / Expertise*</label>
                <input
                    type="text"
                    name="skills"
                    value={ApplyFormData.skills}
                    onChange={handleDataapply}
                    placeholder="Web Dev, AI, Blockchain, Design, etc."
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.skills ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            {/* Team Name */}
            <div>
                <label className="block mb-1 font-medium">Team Name*</label>
                <input
                    type="text"
                    name="teamName"
                    value={ApplyFormData.teamName}
                    onChange={handleDataapply}
                    placeholder="e.g., Code Warriors"
                    className={`w-full p-2 rounded bg-gray-800 border ${errors.teamName ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
            </div>

            {/* Team main name */}
            <div>
                <label className="block mb-2 font-medium">Team Lead Name</label>
                <input placeholder='Head of the team' name="teamLeadName" value={ApplyFormData.teamLeadName} onChange={handleDataapply} className='w-full p-2 rounded bg-gray-800 border border-gray-700' />
            </div>

            <div>
                <label className="block mb-2 font-medium">Members</label>
                <input placeholder='1 or 2 or 3 or 4 ' name="membersCount" value={ApplyFormData.membersCount} onChange={handleDataapply} className='w-full p-2 rounded bg-gray-800 border border-gray-700' />
            </div>

            {/* Idea Description */}
            <div>
                <label className="block mb-1 font-medium">
                Describe your idea or area of interest*
                </label>
                <textarea
                onChange={handleDataapply}
                rows="4"
                name="ideaDescription"
                value={ApplyFormData.ideaDescription}
                placeholder="Briefly explain what you plan to build or explore..."
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                />
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-4 rounded-lg transition-colors`}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            </div>
      </form>
    </div>
  )
}

export default AppliedEvent

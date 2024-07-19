import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'

function ContactUs() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async(e) => {
    e.preventDefault();
    let toastId;
    try {
      if([formData.name, formData.message, formData.email].some(field=>field.trim()=="")){
        toast.error("Please fill all the fields")
        return;
      }
      toastId = toast.loading("Submitting your request...");
      const resp=await axios.post(`${import.meta.env.VITE_BASE_URI}/c/contact-us`,formData);
      if(!resp){
        toast.dismiss(toastId);
        toast.error("!Something went wrong while sending the request");
        return;
      }
      toast.dismiss(toastId);
      toast.success("Your message has been sent successfully")
      setFormData({
        email: '',
        name: '',
        message: ''
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong while sending your request")
    }
  };

  return (
    <div className="bg-[#21787333] py-8">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSend} className="space-y-4">{/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#217873] text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  );
}

export default ContactUs;

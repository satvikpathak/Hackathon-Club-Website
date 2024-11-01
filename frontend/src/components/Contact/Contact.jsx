import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import image from "./image.png";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting contact data:", data);
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        data
      );

      if (response.data.status === "ok") {
        alert("Message sent successfully!");
        setIsModalOpen(false);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left side with image */}
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-t-lg md:rounded-l-lg">
        <img
          src={image}
          alt="Contact Illustration"
          className="w-full h-full object-cover"
        />
        {/* Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-40"></div>
      </div>

      {/* Right side with "Get Started" button */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black bg-opacity-90 text-white font-inter p-8 rounded-b-lg md:rounded-r-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-red-500">Contact Us</h2>
        <p className="text-center text-gray-400 mb-4">
          Reach out to us for any queries or support!
        </p>
        <motion.button
          className="px-6 py-3 mb-4 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsModalOpen(true)}
        >
          Get Started
        </motion.button>
      </div>

      {/* Modal for Contact Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md p-8 rounded-lg bg-stone-900 backdrop-blur-lg border border-stone-700 shadow-lg"
            style={{ boxShadow: "0 0 15px 1px rgba(255, 0, 0, 0.8)" }}
          >
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
              <motion.input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-3 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
              />
              {errors.name && touchedFields.name && (
                <div className="text-red-400 text-sm">{errors.name.message}</div>
              )}

              <motion.input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
              />
              {errors.email && touchedFields.email && (
                <div className="text-red-400 text-sm">{errors.email.message}</div>
              )}

              <motion.textarea
                placeholder="Message"
                {...register("message", { required: "Message is required" })}
                className="w-full p-3 h-32 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
              />
              {errors.message && touchedFields.message && (
                <div className="text-red-400 text-sm">{errors.message.message}</div>
              )}

              <motion.button
                type="submit"
                className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
              >
                Send Message
              </motion.button>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              X
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Contact;

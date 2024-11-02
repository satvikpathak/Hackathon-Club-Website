import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import {toast,Toaster} from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        data
      );

      if (response.data.status === "ok") {
        toast.success("Successfully Registered!");
        setTimeout(()=>{
          navigate("/login");
        },1000)

      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white font-inter">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm p-6 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg border border-stone-700 shadow-md"
        style={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)" }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <motion.input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 rounded-md bg-stone-900 border border-stone-700 text-white placeholder-stone-400 focus:ring-2 focus:ring-red-600 transition"
          />
          {errors.name && touchedFields.name && (
            <div className="text-red-400 text-xs">{errors.name.message}</div>
          )}

          <motion.input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 rounded-md bg-stone-900 border border-stone-700 text-white placeholder-stone-400 focus:ring-2 focus:ring-red-600 transition"
          />
          {errors.email && touchedFields.email && (
            <div className="text-red-400 text-xs">{errors.email.message}</div>
          )}

          <motion.input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 rounded-md bg-stone-900 border border-stone-700 text-white placeholder-stone-400 focus:ring-2 focus:ring-red-600 transition"
          />
          {errors.password && touchedFields.password && (
            <div className="text-red-400 text-xs">{errors.password.message}</div>
          )}

          <motion.input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full p-2 rounded-md bg-stone-900 border border-stone-700 text-white placeholder-stone-400 focus:ring-2 focus:ring-red-600 transition"
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <div className="text-red-400 text-xs">{errors.confirmPassword.message}</div>
          )}

          <motion.button
            type="submit"
            className="w-full py-2 mt-3 rounded-md bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold transition duration-200 transform hover:scale-105 shadow-lg shadow-red-500/50"
          >
            Register
          </motion.button>
        </form>

        <Link to="/login">
          <motion.p
            className="text-center mt-4 text-sm text-stone-400 hover:text-red-500 transition duration-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Already have an account? <span className="text-red-500 underline">Login</span>
          </motion.p>
        </Link>
      </motion.div>
    </div>
  );
}

export default Register;

import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const { register, handleSubmit, watch, formState: { errors, touchedFields } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    navigate('/Login');
  };
  const password = watch("password");

  return (
    <div className="min-h-screen mt-auto flex justify-center items-center text-white font-inter">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg border border-gray-700 shadow-lg"
        style={{ boxShadow: '0 0 15px 4px rgba(255, 0, 0, 0.8)' }} // Red shadow
      >
        <h2 className="text-5xl font-bold mb-6 pb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-500">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <motion.input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-3 rounded-lg bg-gray-900 border border-white-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.username && touchedFields.username && (
            <div className="text-red-400 text-sm">{errors.username.message}</div>
          )}

          <motion.input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            className="w-full p-3 rounded-lg bg-gray-900 border border-white-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && touchedFields.email && (
            <div className="text-red-400 text-sm">{errors.email.message}</div>
          )}

          <motion.input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className="w-full p-3 rounded-lg bg-gray-900 border border-white-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.password && touchedFields.password && (
            <div className="text-red-400 text-sm">{errors.password.message}</div>
          )}

          <motion.input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className="w-full p-3 rounded-lg bg-gray-900 border border-white-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <div className="text-red-400 text-sm">{errors.confirmPassword.message}</div>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
        </form>

        <Link to="/Login">
          <motion.p
            className="text-center mt-4 text-sm text-gray-400 hover:text-red-500 transition duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account? <span className="text-red-500 hover:underline">Login</span>
          </motion.p>
        </Link>
      </motion.div>
    </div>
  );
}

export default Register;

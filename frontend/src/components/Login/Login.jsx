import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", data);
      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);
        toast.success("Successfully Logged in !!");
       
        setTimeout(()=>{
          navigate("/home");
        },1000)
      } else alert(response.data.error);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white font-inter">
      <Toaster/>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 rounded-lg bg-black bg-opacity-80 border border-stone-700 shadow-lg"
        style={{ boxShadow: "0 0 12px rgba(255, 0, 0, 0.7)" }}
      >
        <h2 className="text-3xl font-semibold mb-5 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 rounded-lg bg-stone-950 border border-gray-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && <div className="text-red-400 text-sm">{errors.email.message}</div>}

          <motion.input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 8" },
            })}
            className="w-full p-3 rounded-lg bg-stone-950 border border-gray-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.password && <div className="text-red-400 text-sm">{errors.password.message}</div>}

          <motion.button
            type="submit"
            className="w-full py-3 mt-3 rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white font-medium text-lg transition hover:from-red-500 hover:to-red-300"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </form>
        <Link to="/register">
          <p className="text-center mt-4 text-sm text-stone-400 hover:text-red-500 transition">
            Don't have an account? <span className="text-red-500 underline">Register</span>
          </p>
        </Link>
      </motion.div>
    </div>
  );
}

export default Login;

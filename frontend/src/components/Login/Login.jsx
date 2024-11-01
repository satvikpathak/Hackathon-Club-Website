import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting login data:", data);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);
        console.log("success")
        navigate("/home");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white font-inter">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-80 backdrop-blur-lg border border-stone-700 shadow-lg"
        style={{ boxShadow: "0 0 15px 1px rgba(255, 0, 0, 0.8)" }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center pb-4  bg-clip-text ">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <motion.input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 rounded-lg bg-stone-950 border border-white-500 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
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
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            className="w-full p-3 rounded-lg bg-stone-950 border border-white-500 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-out duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.password && touchedFields.password && (
            <div className="text-red-400 text-sm">
              {errors.password.message}
            </div>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </form>

        <Link to="/register">
          <motion.p
            className="text-center mt-4 text-sm text-stone-400 hover:text-red-500 transition duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Don't have an account?{" "}
            <span className="text-red-500 underline">Register</span>
          </motion.p>
        </Link>
      </motion.div>
    </div>
  );
}

export default Login;

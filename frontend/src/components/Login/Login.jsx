import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
      console.log("i reached here")
      console.log("Submitting login data:", data);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      console.log("i reached here")

      console.log("Response from server:", response.data);

      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again."); // Generic error handling
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      <div className="w-full max-w-md border-2 border-white p-8 rounded-lg bg-black shadow-lg shadow-red-600">
        <h2 className="text-4xl font-semibold mb-6 text-center">Login</h2>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)} // Ensures the form submits correctly
        >
          <input
            type="text"
            placeholder="Username/Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 rounded bg-black border text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && touchedFields.email && (
            <div className="text-red-400 text-sm">{errors.email.message}</div>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            className="w-full p-2 rounded bg-black border text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && touchedFields.password && (
            <div className="text-red-400 text-sm">{errors.password.message}</div>
          )}

          <button
            type="submit" // Changed to type="submit"
            className="w-full py-3 mt-4 rounded bg-gradient-to-r from-red-800 to-red-600 text-white font-bold text-lg transition-all duration-200"
          >
            Login
          </button>
        </form>

        <Link to="/register">
          <p className="text-center mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <span className="text-red-600 hover:underline">Register</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Login;

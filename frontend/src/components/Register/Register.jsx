import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation,useNavigate } from "react-router-dom";


function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data)=>{
    navigate('/Login')
  }
  const password = watch("password");

  return (
    <div className='text-3xl min-h-screen text-white flex justify-center items-center '>
      <div className="w-full max-w-md border-2 border-white p-8 rounded-lg bg-gray-950 shadow-lg shadow-neutral-200">
        <h2 className="text-4xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <div className="text-red-500 text-sm">{errors.username.message}</div>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword.message}</div>}

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-gradient-to-r from-red-800 to-red-600  text-white font-bold text-lg transition-all duration-200 "
          >
            Register
          </button>
        </form>

        <Link to = "/Login">
        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account? <a href='' className="text-blue-400 hover:underline">Login</a>
        </p>
        </Link>
      </div>
    </div>
  );
}

export default Register;

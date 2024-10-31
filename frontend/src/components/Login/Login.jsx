import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation,useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onsubmit = async (data)=>{
    navigate('/home')
  }

  return (
    <div className='text-xl min-h-screen text-white flex justify-center items-center'>
      <div className="w-full max-w-md border-2 border-white  p-8 rounded-lg bg-black shadow-lg shadow-red-600">
        <h2 className="text-4xl font-semibold mb-6 text-center">Login</h2>
        <form action="" className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <input
            type="text"
            placeholder="Username/Email"
            {...register("UsernameEmail",{required:"Email is required"})}
            className="w-full p-2 rounded bg-black border text-white after:focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.UsernameEmail && <div>{errors.UsernameEmail.message}</div>}

          <input
            type="password"
            placeholder="Password"
            {...register("password",{required:"Password is required",minLength:{value:8,message:"Minimum length is 8"}})}
            className="w-full p-2 rounded bg-black border text-white after:focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <div>{errors.password.message}</div>}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-gradient-to-r from-red-800 to-red-600 text-white font-bold text-lg transition-all duration-200"
          >
            Login
          </button>
        </form>
        
        <Link to="/Register">
        <p className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="/register" className="text-red-600 hover:underline">Register</a>
        </p>
        </Link>
      </div>
    </div>
  );
}

export default Login;

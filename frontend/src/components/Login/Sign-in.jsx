import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";
import { SignIn } from "@clerk/clerk-react";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();



  return (
    <div className="flex justify-center items-center h-screen">
    <main className="auth-page">
      <SignIn />
    </main>
    </div>
  );
}

export default Login;

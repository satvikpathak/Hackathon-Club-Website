import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import {toast,Toaster} from "react-hot-toast";
import { SignUp } from "@clerk/clerk-react";

function Register() {
 
   

  return (

      
      <div className="flex justify-center items-center h-screen">
      <main className="auth-page">
     <SignUp/>
   </main>
   </div>
  );
}

export default Register;
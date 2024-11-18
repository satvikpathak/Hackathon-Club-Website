import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

// Utility function for className management
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// FloatingNav Component
const FloatingNav = ({ navItems = [], className }) => {
  const location = useLocation(); // Get the current location

  // Animation variants for better control
  const variants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // Custom easing
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn(
        "flex max-w-fit sticky top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={`link-${idx}`}
          to={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <motion.span
            className="flex flex-wrap sm:block text-sm"
            whileHover={{ scale: 1.1 }} // Scale only, no rotation
            transition={{ duration: 0 }} // Instant effect
          >
            {navItem.name}
          </motion.span>
          {location.pathname === navItem.link && (
            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-l from-transparent to-red-500 rounded" />
          )}
        </Link>
      ))}
      <SignedOut>
        <Link to="/sign-up">
          <motion.button
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full transition-transform duration-200 hover:scale-110"
            whileHover={{ scale: 1.05 }} // Slightly scale on hover
          >
            <span>Register</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-red-500 to-transparent h-px" />
          </motion.button>
        </Link>
        <Link to="/sign-in">
          <motion.button
            className="border bg-gradient-to-r from-red-800 to-red-600 hover:bg-red-900 text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full transition-transform duration-200 hover:scale-110"
            whileHover={{ scale: 1.05 }} // Slightly scale on hover
          >
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent to-transparent h-px" />
          </motion.button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </motion.div>
  );
};

// Header Component
const Header = () => {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Hackathons", link: "/hackathons" },
    { name: "Skills", link: "/skills" },
    { name: "Contact", link: "/contact" },
    { name: "Profiles", link: "/profiles" }, {/* Added ProfilePage link here */}
  ];

  useEffect(() => {
    // Check for system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  return (
    <div className="sticky flex z-50 top-1">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Header;

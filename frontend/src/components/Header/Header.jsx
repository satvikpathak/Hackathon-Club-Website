"use client";
import React from "react";
import {
  motion,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Import from react-router-dom
import { clsx } from "clsx"; // Import clsx for conditional class names
import { twMerge } from "tailwind-merge"; // Import tailwind-merge for merging classes

// Utility function for class name management
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// FloatingNav Component
const FloatingNav = ({ navItems = [], className }) => {
  const location = useLocation(); // Get the current location

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-fit sticky top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={`link=${idx}`}
          to={navItem.link} // Use 'to' instead of 'href'
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className=" flex flex-wrap sm:block text-sm">{navItem.name}</span>
          {location.pathname === navItem.link && (
            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-l from-transparent to-blue-500 rounded" />
          )}
        </Link>
      ))}
      <Link to="/register">
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Register</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </Link>
    </motion.div>
  );
};

// Header Component
const Header = () => {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Hackathons", link: "/hackathons" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" }
  ];

  return (
    <div className="sticky top-0">
      <div className="absolute inset-x-0 top-0">
        <FloatingNav navItems={navItems} />
      </div>
    </div>
  );
};

export default Header;

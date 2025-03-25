import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

// Utility function for className management
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// FloatingNav Component
const FloatingNav = ({ navItems = [], className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={cn(
          "flex max-w-fit sticky top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2 items-center justify-between",
          className
        )}
      >
        {/* Logo/Brand (assuming first item is Home)
        <Link
          to={navItems[0]?.link || "/"}
          className="font- text-lg dark:text-white text-neutral-800 flex items-center"
        >
          {navItems[0]?.name || "Home"}
        </Link> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} className="text-white dark:text-white"/>}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.slice(0).map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <motion.span
                className="text-sm"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0 }}
              >
                {navItem.name}
              </motion.span>
              {location.pathname === navItem.link && (
                <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-l from-transparent to-red-500 rounded" />
              )}
            </Link>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <SignedOut>
            <Link to="/sign-in">
              <motion.button
                className="text-sm font-medium relative text-black dark:text-white px-3 py-1 rounded-full transition-transform duration-200 hover:scale-110"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/sign-up">
              <motion.button
                className="border bg-gradient-to-r from-red-800 to-red-600 hover:bg-red-900 text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white px-3 py-1 rounded-full transition-transform duration-200 hover:scale-110"
                whileHover={{ scale: 1.05 }}
              >
                Register
              </motion.button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </motion.div>
{/* Mobile Menu */}
<motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="md:hidden fixed top-16 left-4 right-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-[5000]"
      >
        <div className="flex flex-col p-4">
          {navItems.slice(0).map((navItem, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              to={navItem.link}
              className={cn(
                "py-3 px-4 border-b border-gray-100 dark:border-gray-800 last:border-0",
                location.pathname === navItem.link
                  ? "text-red-600 dark:text-red-400 font-medium"
                  : "text-gray-800 dark:text-gray-200"
              )}
            >
              {navItem.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <SignedOut>
              <Link to="/sign-in" className="w-full">
                <button className="w-full text-center py-2 text-neutral-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/sign-up" className="w-full">
                <button className="w-full text-center py-2 bg-gradient-to-r from-red-800 to-red-600 text-white rounded-lg">
                  Register
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center py-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </motion.div>

    </>
  );
};

// Header Component
const Header = () => {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Hackathons", link: "/hackathons" },
    { name: "Profile", link: "/skills" },
    { name: "Connect", link: "/profiles" }, 
    { name: "Contact", link: "/contact" }
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
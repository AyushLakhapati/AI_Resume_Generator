import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../api/AuthService";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    // Lock to dark theme
    document.querySelector("html").setAttribute("data-theme", "dark");
  }, []);

  const logout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <div className="navbar glass-effect sticky top-0 z-50 px-4 md:px-10 border-b border-white/20 transition-all duration-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content glass-effect rounded-2xl z-[1] mt-3 w-52 p-4 shadow-2xl border border-white/20"
          >
            <li><Link to={"/about"} className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to={"/services"} className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to={"/contact"} className="hover:text-primary transition-colors">Contact Us</Link></li>
            {currentUser && (
              <li><Link to={"/my-resumes"} className="text-secondary font-bold hover:text-primary transition-colors">My Resumes</Link></li>
            )}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-2xl font-black tracking-tighter">
          <span className="text-primary italic">AI</span> Resume
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold text-slate-300">
          <li><Link to={"/about"} className="hover:text-primary hover:bg-transparent">About</Link></li>
          <li><Link to={"/services"} className="hover:text-primary hover:bg-transparent">Services</Link></li>
          <li><Link to={"/contact"} className="hover:text-primary hover:bg-transparent">Contact Us</Link></li>
          {currentUser && (
             <li><Link to={"/my-resumes"} className="text-secondary font-bold hover:text-primary hover:bg-transparent">My Resumes</Link></li>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {currentUser ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-bold text-slate-200">Hi, <span className="text-primary">{currentUser.username}</span></span>
            <button onClick={logout} className="btn btn-error btn-sm btn-outline rounded-xl px-6">Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm font-bold">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm rounded-xl px-6 shadow-lg shadow-primary/20">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

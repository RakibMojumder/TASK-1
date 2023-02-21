import React from "react";
import { NavLink } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <div className="flex border-b border-slate-400 text-center">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex-1 py-1.5 uppercase font-semibold rounded-tl-md ${
            isActive && "bg-[#45C6B1] text-white"
          }`
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `flex-1 py-1.5 uppercase font-semibold rounded-tr-md ${
            isActive && "bg-[#45C6B1] text-white"
          }`
        }
      >
        Register
      </NavLink>
    </div>
  );
};

export default AuthNavbar;

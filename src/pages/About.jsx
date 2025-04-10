import React from "react";
import { Link, NavLink, Outlet } from "react-router";

// Shared Layout
export default function About() {
  return (
    <div>
      <ul className="menu menu-horizontal gap-3 bg-base-200 w-full justify-center text-gray-500 font-bold">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-blue-400" : ""
            }
            to="/about/aboutUs"
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-blue-400" : ""
            }
            to="/about/contactUs"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div className="mx-10 mt-5">
        <h1 className="text-4xl font-extrabold my-5">About Pomme Frites</h1>
        <Outlet />
      </div>
    </div>
  );
}

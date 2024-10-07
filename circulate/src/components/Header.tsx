import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#8BD0F8",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <img
          src="/logo.JPEG"
          alt="Logo"
          style={{ height: "100px" }}
        />
      </div>

      {/* Right side navigation links */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <NavLink
          to="/Home"
          style={({ isActive }) => ({
            display: "inline",
            textAlign: "center",
            color: isActive ? "#FFF" : "#EBF8FF",
            fontSize: 18,
            fontFamily: "Inter",
            fontWeight: isActive ? "bold" : "500",
            lineHeight: "30px",
            letterSpacing: 1.62,
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>

        {/* Repeat for other NavLinks */}
        <NavLink
          to="/Products"
          style={({ isActive }) => ({
            display: "inline",
            textAlign: "center",
            color: isActive ? "#FFF" : "#EBF8FF",
            fontSize: 18,
            fontFamily: "Inter",
            fontWeight: isActive ? "bold" : "500",
            lineHeight: "30px",
            letterSpacing: 1.62,
            textDecoration: "none",
          })}
        >
          Products
        </NavLink>

        <NavLink
          to="/Account"
          style={({ isActive }) => ({
            display: "inline",
            textAlign: "center",
            color: isActive ? "#FFF" : "#EBF8FF",
            fontSize: 18,
            fontFamily: "Inter",
            fontWeight: isActive ? "bold" : "500",
            lineHeight: "30px",
            letterSpacing: 1.62,
            textDecoration: "none",
          })}
        >
          Account
        </NavLink>

        <NavLink
          to="/AboutUs"
          style={({ isActive }) => ({
            display: "inline",
            textAlign: "center",
            color: isActive ? "#FFF" : "#EBF8FF",
            fontSize: 18,
            fontFamily: "Inter",
            fontWeight: isActive ? "bold" : "500",
            lineHeight: "30px",
            letterSpacing: 1.62,
            textDecoration: "none",
          })}
        >
          About Us
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

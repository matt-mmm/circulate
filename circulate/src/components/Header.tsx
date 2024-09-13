import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px", // Set a specific height for the header
        background: "#8BD0F8",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns everything to the left
        padding: "0 20px", // Padding for space between the content and the edges
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.JPEG" // Correct path from the public folder
          alt="Logo"
          style={{ height: "100px", marginRight: "1100px" }} // Add margin-right to create space between logo and links
        />

        {/* Right side navigation links */}
        <div style={{ display: "flex", gap: "40px" }}>
        <NavLink
            to="/Home"
            style={({ isActive }) => ({
              textAlign: "center",
              color: isActive ? "#FFF" : "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: isActive ? "bold" : "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
              textDecoration: "none",
            })}
          >
            Home
          </NavLink>

        <NavLink
            to="/Products"
            style={({ isActive }) => ({
              textAlign: "center",
              color: isActive ? "#FFF" : "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: isActive ? "bold" : "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
              textDecoration: "none",
            })}
          >
            Products
          </NavLink>

          <NavLink
            to="/Inbox"
            style={({ isActive }) => ({
              textAlign: "center",
              color: isActive ? "#FFF" : "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: isActive ? "bold" : "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
              textDecoration: "none",
            })}
          >
            Inbox
          </NavLink>

          <NavLink
            to="/AboutUs"
            style={({ isActive }) => ({
              textAlign: "center",
              color: isActive ? "#FFF" : "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: isActive ? "bold" : "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
              textDecoration: "none",
            })}
          >
            About Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

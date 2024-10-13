import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation(); // Get the current path to determine the active link

  const handleMouseEnter = (link: string) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = (isActive: boolean, link: string) => ({
    display: "inline",
    textAlign: "center",
    color: isActive ? "#FFF" : "#EBF8FF",
    fontSize: hoveredLink === link || isActive ? 26 : 22, // Maintain larger size if active or hovered
    fontFamily: "Inter",
    fontWeight: isActive ? "bold" : "500",
    lineHeight: "30px",
    letterSpacing: 1.62,
    textDecoration: "none",
    margin: "0 20px",
    transition: "font-size 0.3s ease", // Smooth transition for resizing
  });

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
      <div style={{ display: "flex", alignItems: "center", width: "200px" }}>
        <img
          src="/logo.JPEG"
          alt="Logo"
          style={{ height: "100px" }}
        />
      </div>

      {/* Center navigation links */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
        <NavLink
          to="/Home"
          style={({ isActive }) => linkStyle(isActive, "Home")}
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </NavLink>

        <NavLink
          to="/Products"
          style={({ isActive }) => linkStyle(isActive, "Products")}
          onMouseEnter={() => handleMouseEnter("Products")}
          onMouseLeave={handleMouseLeave}
        >
          Products
        </NavLink>

        <NavLink
          to="/AboutUs"
          style={({ isActive }) => linkStyle(isActive, "AboutUs")}
          onMouseEnter={() => handleMouseEnter("AboutUs")}
          onMouseLeave={handleMouseLeave}
        >
          About Us
        </NavLink>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        <NavLink
          to="/Account"
          style={({ isActive }) => linkStyle(isActive, "Account")}
          onMouseEnter={() => handleMouseEnter("Account")}
          onMouseLeave={handleMouseLeave}
        >
          Create an Account
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
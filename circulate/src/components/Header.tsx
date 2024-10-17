// src/components/Header.tsx

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Determine if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('id_token');

  const handleMouseEnter = (link: string) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = (isActive: boolean, link: string) => ({
    display: "inline",
    textAlign: "center",
    color: isActive ? "white" : "white",
    fontSize: hoveredLink === link || isActive ? 26 : 22, // Maintain larger size if active or hovered
    fontFamily: "'SF Pro Display', sans-serif", // Updated font family
    fontWeight: isActive ? "bold" : "500",
    lineHeight: "30px",
    letterSpacing: 1.62,
    textDecoration: "none",
    margin: "0 20px",
    transition: "font-size 0.3s ease",
    cursor: "pointer",
  });

  // Sign-out function
  const handleSignOut = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');

    // Redirect to Cognito's logout URL
    const clientId = '6sttjboiag1ha957tqt9lha4q8'; // Replace with your actual Client ID
    const redirectUri = encodeURIComponent('http://localhost:3000/');
    const cognitoDomain = 'https://circulatesignup.auth.us-east-2.amazoncognito.com';
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

    window.location.href = logoutUrl;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#2B303A",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        position: "sticky", // Make the header sticky
        top: 0, // Stick to the top of the page
        zIndex: 1000, // Ensure the header appears above other content
        fontFamily: "'SF Pro Display', sans-serif", // Apply the font globally to the header
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center", width: "200px", position: "absolute", left: "" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "100px" }} />
      </div>
  
      {/* Center navigation links */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "space-between", // Space the links evenly
          width: "700px", // Set a fixed width for consistent spacing
          color: 'white'
        }}
      >
        <NavLink
          to="/Products"
          style={({ isActive }) => linkStyle(isActive, "Products")}
          onMouseEnter={() => handleMouseEnter("Products")}
          onMouseLeave={handleMouseLeave}
        >
          Products
        </NavLink>
  
        <NavLink
          to="/Home"
          style={({ isActive }) => linkStyle(isActive, "Home")}
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
        >
          Home
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

      {/* Right side account link or sign-out button */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingRight: "20px" }}>
        {isAuthenticated ? (
          // Sign-out button
          <span
            onClick={handleSignOut}
            style={linkStyle(false, "SignOut")}
            onMouseEnter={() => handleMouseEnter("SignOut")}
            onMouseLeave={handleMouseLeave}
          >
            Sign Out
          </span>
        ) : (
          // Create an Account link
          <a
            href="https://circulatesignup.auth.us-east-2.amazoncognito.com/login?client_id=6sttjboiag1ha957tqt9lha4q8&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback"
            style={linkStyle(false, "Account")}
            onMouseEnter={() => handleMouseEnter("Account")}
            onMouseLeave={handleMouseLeave}
          >
            Sign in
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Amplify } from "aws-amplify"; // Correct import for Amplify
import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth"; // Import specific methods from @aws-amplify/auth

// Configure Amplify directly in the component
Amplify.configure({
  Auth: {
    region: 'us-east-1', // Replace with your region
    userPoolId: 'your-user-pool-id', // Replace with your Cognito User Pool ID
    userPoolWebClientId: 'your-user-pool-client-id', // Replace with your Cognito Web Client ID
    authenticationFlowType: 'USER_SRP_AUTH', // Or other authentication type you are using
  },
});

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Fetch the logged-in user's name from the Lehigh database using their email
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the current authenticated user
        const user = await getCurrentUser(); // Use getCurrentUser directly
        const userEmail = user.attributes.email;

        // Fetch the user's name from Lehigh's LDAP search using the email
        const ldapResponse = await fetch(
          `https://www.lehigh.edu/cgi-bin/ldapsearch/ldapsearch.pl?mail=${userEmail}`
        );

        // Assuming the response returns an HTML page with a specific pattern containing the name
        const ldapText = await ldapResponse.text();

        // Extract name from the returned HTML or response format (you'll need to adjust this based on the exact format)
        const nameMatch = ldapText.match(/Name:\s*([^\n]+)/); // Adjust this pattern based on the actual HTML format
        const name = nameMatch ? nameMatch[1] : null;

        if (name) {
          setUserName(name);
        } else {
          console.error("Name not found in LDAP response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Check if the user is authenticated and fetch their name
    fetchUserName();
  }, []);

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
        position: "sticky", // Make the header sticky
        top: 0, // Stick to the top of the page
        zIndex: 1000, // Ensure the header appears above other content
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center", width: "200px", position: "absolute", left: "20px" }}>
        <img
          src="/logo.JPEG"
          alt="Logo"
          style={{ height: "100px" }}
        />
      </div>

      {/* Center navigation links */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
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
      </div>

      {/* Right side account link */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingRight: "20px" }}>
        {userName ? (
          <span style={{ fontSize: "22px", color: "#FFF", fontFamily: "Inter" }}>Hello, {userName}</span>
        ) : (
          <NavLink
            to="https://circulatesignup.auth.us-east-2.amazoncognito.com/login?client_id=6sttjboiag1ha957tqt9lha4q8&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000"
            style={({ isActive }) => linkStyle(isActive, "Account")}
            onMouseEnter={() => handleMouseEnter("Account")}
            onMouseLeave={handleMouseLeave}
          >
            Create an Account
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
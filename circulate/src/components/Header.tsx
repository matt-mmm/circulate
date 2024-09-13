import React from "react";


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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo.JPEG" // Correct path from the public folder
          alt="Logo"
          style={{ height: "100px", marginRight: '1100px' }} // Add margin-right to create space between logo and links
        />

        {/* Right side navigation links */}
        <div style={{ display: "flex", gap: "40px" }}>
          <div
            style={{
              textAlign: "center",
              color: "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
            }}
          >
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
            }}
          >
            Products
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
            }}
          >
            Inbox
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#EBF8FF",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 30,
              letterSpacing: 1.62,
              wordWrap: "break-word",
            }}
          >
            About Us
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

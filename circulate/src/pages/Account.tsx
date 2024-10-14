import React, { useState } from 'react';
import Header from "../components/Header.tsx";
import './Account.css';

const Account = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRegistering) {
      // Check if user exists in the database when signing in
      const emailExists = await checkUserExists(email);
      if (!emailExists) {
        alert("Email is not registered. Please register an account.");
        return; // Stop further execution if the email is not found
      }
    }

    // Prepare the data to send
    const data = {
      email,
      password,
      ...(isRegistering && { phoneNumber }),  // Include phone number only if registering
    };

    try {
      const response = await fetch("https://zth2fyccjk.execute-api.us-east-2.amazonaws.com/prod/postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        alert(isRegistering ? "Account created successfully!" : "Signed in successfully!");
      } else {
        console.error("Form submission failed");
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  // Function to check if the email exists in DynamoDB
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`https://zth2fyccjk.execute-api.us-east-2.amazonaws.com/prod/getUser?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return !!data.email; // If email is returned, user exists
      } else if (response.status === 404) {
        // User not found
        return false;
      } else {
        console.error("Failed to check user existence:", response);
        alert("Error checking user. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred while checking user:", error);
      alert("Error checking user. Please try again.");
      return false;
    }
  };

  return (
    <div className="account-page">
      <Header />
      <div className="main-container">
        <div className="left-section">
          <div className="background-layer"></div>
          <div className="content-layer">
            <div className="quote-icon">
              <div className="circle"></div>
            </div>
            <div className="main-text">
              <h1>Find the perfect items for free</h1>
            </div>
            <div className="sub-text">
              <p>Browse hundreds of free products on our marketplace</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>{isRegistering ? "Create Account" : "Sign In"}</h2>
          <p className="subtitle">
            {isRegistering ? "Register to start using the platform" : "Sign in to your account"}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegistering && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input-field"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              )}
            </div>
            <div className="captcha">
              <input type="checkbox" id="robot-check" required />
              <label htmlFor="robot-check">I’m not a robot</label>
            </div>
            <button type="submit" className="signup-btn">
              {isRegistering ? "Register" : "Sign In"}
            </button>
          </form>
          <p className="toggle-form">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <span onClick={toggleForm}>
              {isRegistering ? " Sign In" : " Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;

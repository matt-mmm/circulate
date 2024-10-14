import React, { useState } from 'react';
import Header from "../components/Header.tsx";
import './Account.css';

const Account = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsConfirming(false); // Reset confirmation state when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (!isConfirming) {
        // Register the user
        try {
          await Auth.signUp({
            username: email,
            password,
            attributes: {
              email,
              phone_number: phoneNumber,
            },
          });
          setIsConfirming(true); // Set to confirmation step
          alert("Verification code sent to your email.");
        } catch (error) {
          console.error("Error signing up:", error);
          alert(error.message || "Error signing up. Please try again.");
        }
      } else {
        // Confirm registration with verification code
        try {
          await Auth.confirmSignUp(email, confirmationCode);
          alert("Account verified successfully!");
          setIsConfirming(false);
          setIsRegistering(false);
        } catch (error) {
          console.error("Error confirming sign-up:", error);
          alert(error.message || "Error confirming sign-up. Please try again.");
        }
      }
    } else {
      // Sign in the user
      try {
        await Auth.signIn(email, password);
        alert("Signed in successfully!");
      } catch (error) {
        console.error("Error signing in:", error);
        alert(error.message || "Error signing in. Please try again.");
      }
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
              {!isConfirming && (
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}
              {isRegistering && !isConfirming && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input-field"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              )}
              {isConfirming && (
                <input
                  type="text"
                  placeholder="Confirmation Code"
                  className="input-field"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                />
              )}
            </div>
            <div className="captcha">
              <input type="checkbox" id="robot-check" required />
              <label htmlFor="robot-check">I’m not a robot</label>
            </div>
            <button type="submit" className="signup-btn">
              {isRegistering
                ? isConfirming
                  ? "Confirm Account"
                  : "Register"
                : "Sign In"}
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

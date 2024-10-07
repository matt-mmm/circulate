import React, { useState } from 'react';
import Header from "../components/Header.tsx";
import './Account.css';

const Account = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
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
          <div className="form-fields">
            <input type="email" placeholder="Enter your email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            {isRegistering && (
              <input type="text" placeholder="Phone Number" className="input-field" />
            )}
          </div>
          <div className="captcha">
            <input type="checkbox" id="robot-check" />
            <label htmlFor="robot-check">I’m not a robot</label>
          </div>
          <button className="signup-btn">
            {isRegistering ? "Register" : "Sign In"}
          </button>
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

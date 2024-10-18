// RequireAuth.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        Auth.federatedSignIn(); // Redirect to Cognito Hosted UI
      });
  }, []);

  if (isAuthenticated === null) {
    // Render a loading indicator while checking auth status
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  // The user is being redirected to the sign-in page
  return null;
};

export default RequireAuth;

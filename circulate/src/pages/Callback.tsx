// src/pages/Callback.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the authorization code from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      // Exchange the authorization code for tokens
      const data = {
        grant_type: 'authorization_code',
        client_id: '6sttjboiag1ha957tqt9lha4q8', // Replace with your actual Client ID
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
      };

      const url = 'https://circulatesignup.auth.us-east-2.amazoncognito.com/oauth2/token';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch tokens');
          }
          return response.json();
        })
        .then(tokens => {
          // Store tokens securely
          localStorage.setItem('id_token', tokens.id_token);
          localStorage.setItem('access_token', tokens.access_token);
          // Redirect to products page or wherever appropriate
          navigate('/Products');
        })
        .catch(error => {
          console.error('Error fetching tokens:', error);
          // Handle error appropriately, perhaps redirect to login or show error message
          navigate('/');
        });
    } else {
      // No code found, redirect to home or login
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Callback;

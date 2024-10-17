import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Create your MUI theme (you can customize this theme as needed)
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire app with ThemeProvider to provide the Material-UI theme */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Optional: Measuring performance in your app
reportWebVitals();

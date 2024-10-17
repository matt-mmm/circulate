// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Products from "./pages/Products.tsx";
import Callback from "./pages/Callback.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

// Create a theme
const theme = createTheme(); // You can customize the theme if needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/Products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

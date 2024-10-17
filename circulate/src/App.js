import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Account from "./pages/Account.tsx";
import Products from "./pages/Products.tsx";

// Create a theme
const theme = createTheme(); // You can customize the theme if needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Products" element={<Products />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
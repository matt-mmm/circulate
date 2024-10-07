
import React from "react";
//import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Account from "./pages/Account.tsx";
import Products from "./pages/Products.tsx";


function App() {
    return (
         <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path = "/Account" element={<Account />} />
            <Route path="/Products" element={<Products />} />
            </Routes>
         </Router>
            
         
    );
}
 
export default App;
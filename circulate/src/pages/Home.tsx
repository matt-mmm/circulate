import React from "react";
import Header from "../components/Header.tsx";
import MarketplacePromo from "../components/register.tsx";
import Footer from "../components/Footer.tsx";
import NotificationFlag from "../components/NotificationFlag.tsx"; // Import the new component

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <NotificationFlag /> {/* Include the flag here */}
      <MarketplacePromo />
      <Footer />
    </div>
  );
};

export default Home;
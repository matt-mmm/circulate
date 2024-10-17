import React from "react";
import Header from "../components/Header.tsx";
import MarketplacePromo from "../components/register.tsx";
import Footer from "../components/Footer.tsx";


const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MarketplacePromo />
      <Footer/>
    </div>
  );
};

export default Home;
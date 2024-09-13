import React from "react";
import Header from "../components/Header.tsx";
import MarketplacePromo from "../components/register.tsx";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MarketplacePromo />
    </div>
  );
};

export default Home;
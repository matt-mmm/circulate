import React from "react";
import Header from "../components/Header.tsx";
import ProductListing from "../components/ProductListing.tsx";


const Products: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductListing />
    </div>
  );
};
export default Products;

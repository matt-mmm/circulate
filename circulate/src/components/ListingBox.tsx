import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListing from "./ProductListing"; // Adjust the import path if necessary

interface Listing {
  title: string;
  description: string;
  imageData: string | null;
}

const ListingBox: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  // Function to add a new listing
  const addListing = (listing: Listing) => {
    setListings((prevListings) => [...prevListings, listing]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Listings</h2>

      {/* Pass the addListing function as a prop to ProductListing */}
      <ProductListing addListing={addListing} />

      <div className="row">
        {listings.map((listing, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              {listing.imageData ? (
                <img
                  src={listing.imageData}
                  alt={listing.title}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="card-img-top"
                  style={{ height: "200px", backgroundColor: "#f0f0f0" }}
                ></div>
              )}
              <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p className="card-text">{listing.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingBox;

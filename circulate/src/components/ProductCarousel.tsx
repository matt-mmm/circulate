import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../pages/Carousel.css"; // Ensure this file exists and contains your custom styles

// Interface for Product type
interface Product {
  listingId: string;
  imageUrl: string;
  title: string;
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // Used for navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://zth2fyccjk.execute-api.us-east-2.amazonaws.com/prod/getListing"
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    }
  };

  const handleProductClick = (listingId: string) => {
    // Navigate to the listings page with the selected product
    navigate(`/Products?selected=${listingId}`);
  };

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 5, // Increase the number of slides to show more items
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    centerMode: false, // Disable center mode for full-width
    variableWidth: false, // Ensure slides are equal width
    className: "carousel", // Custom class for styling
  };

  return (
    <div
      className="product-carousel-container"
      style={{ padding: "40px 0", backgroundColor: "#565857" }}
    >
      <div className="product-carousel" style={{ width: "100%", margin: "0 auto" }}>
        <Slider {...settings}>
          {products.map((product) => (
            <div className="product-slide" key={product.listingId} >
              <div
                className="product-card"
                onClick={() => handleProductClick(product.listingId)} // Handle click to navigate
                style={{
                  padding: "15px",
                  backgroundColor: "#FFF",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  background: "transparent"
                }}
              >
                <div style={{backgroundColor: '#565857'}}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "250px", // Fixed height for uniformity
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                </div>
                {/* Title Below Image */}
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCarousel;
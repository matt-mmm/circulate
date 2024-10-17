import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../pages/Carousel.css"; // Custom styles for 3D effects

// Interface for Product type
interface Product {
  listingId: string;
  imageUrl: string;
  title: string; // Assuming you have titles for each product
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    centerMode: true,
    centerPadding: "0",
    className: "carousel-3d", // Custom class for 3D carousel styling
  };

  return (
    <div className="product-carousel-container" style={{ padding: "40px 0" }}>
      {/* Title above the carousel */}
      <h2 style={{
          textAlign: "center",
          color: "#333",
          fontFamily: "Inter, sans-serif",
          fontSize: "36px",
          fontWeight: 600,
          marginBottom: "20px",
      }}>
        Check out our Listings!
      </h2>

      {/* Product Carousel */}
      <div className="product-carousel" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Slider {...settings}>
          {products.map((product) => (
            <div className="product-slide" key={product.listingId}>
              <div
                className="product-card"
                style={{
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "350px", // Increased height to accommodate title
                  backgroundColor: "#FFF",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  margin: "0 15px", // Space between slides
                  textAlign: "center", // Center the title text
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title} // Using the product title as the alt text
                  style={{
                    height: "80%", // Adjusted to leave space for the title below
                    maxWidth: "100%", // Prevent stretching beyond card width
                    objectFit: "cover", // Maintain aspect ratio
                    borderRadius: "5px",
                  }}
                />
                {/* Title Below Image */}
                <h4 style={{
                  marginTop: "10px",
                  fontSize: "18px",
                  color: "#333",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}>
                  {product.title}
                </h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCarousel;
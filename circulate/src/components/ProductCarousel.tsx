import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../pages/Carousel.css"; // Custom styles for 3D effects

// Interface for Product type
interface Product {
  listingId: string;
  imageUrl: string;
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
    className: "carousel-3d", // Custom class for styling
  };

  return (
    <div className="product-carousel">
      <Slider {...settings}>
        {products.map((product) => (
          <div className="product-slide" key={product.listingId}>
            <img
              src={product.imageUrl}
              alt="Product"
              className="product-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer.tsx";
import debounce from "lodash.debounce";

// Interface for the Product type
interface Product {
  listingId: string;
  title: string;
  description: string;
  imageUrl: string;
  isRequested?: boolean; // Add a flag for requested items
}

const ProductListing: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State to hold the list of products
  const [isGenerating, setIsGenerating] = useState(false); // For tracking if the description is being generated

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
        const updatedProducts = data.map((product: Product, index: number) => ({
          ...product,
          isRequested: index % 2 === 0, // Simulate some products as requested
        }));
        setProducts(updatedProducts);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    }
  };

  // Function to generate description using OpenAI API
  const generateDescription = async (title: string) => {
    if (title.trim() === "") {
      setDescription("");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Write a very brief casual description of the given listing title with the intent of being given away but dont add any unneccessary commentary: "${title}".`;

      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Ensure your API key is set in environment variables
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        }),
      });

      const gptData = await gptResponse.json();

      // Check if the response contains the expected data
      if (gptData && gptData.choices && gptData.choices.length > 0) {
        const generatedDescription = gptData.choices[0].message.content.trim();
        setDescription(generatedDescription);
      } else {
        console.error("Unexpected response format:", gptData);
        setDescription("Unable to generate description at this time.");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      setDescription("An error occurred while generating the description.");
    } finally {
      setIsGenerating(false);
    }
  };



  // Debounced version of generateDescription to prevent excessive API calls
  const generateDescriptionDebounced = useCallback(
    debounce((title: string) => generateDescription(title), 1000), // 1-second debounce delay
    []
  );

  // Use effect to trigger description generation when title changes
  useEffect(() => {
    if (title.trim()) {
      generateDescriptionDebounced(title);
    } else {
      setDescription("");
    }
  }, [title, generateDescriptionDebounced]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toBase64 = (file: File) =>
      new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const imageData = image ? await toBase64(image) : null;

    const response = await fetch(
      "https://zth2fyccjk.execute-api.us-east-2.amazonaws.com/prod/createListing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageData,
        }),
      }
    );

    if (response.ok) {
      // Reset form fields and close modal
      setTitle("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchProducts(); // Refresh the product list
    } else {
      console.log("Form submission failed");
    }
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleRequestItem = () => {
    alert("Item request functionality coming soon!");
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Centered button for creating a new listing */}
      <div
        className="d-flex justify-content-center mb-4"
        style={{ paddingTop: "50px", width: "100%" }}
      >
        <button
          style={{
            backgroundColor: "#2B303A", // Button color
            borderColor: "#565857",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold", // Bolden text
            marginRight: "20px",
          }}
          className="btn btn-lg"
          onClick={() => setShowModal(true)}
        >
          Create a <span style={{ fontWeight: "bold" }}>Listing</span>
        </button>
        {/* Request Item Button */}
        <button
          style={{
            backgroundColor: "#2B303A", // Same as Create Listing button
            borderColor: "#565857",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold", // Bolden text
          }}
          className="btn btn-lg"
          onClick={handleRequestItem}
        >
          Request an <span style={{ fontWeight: "bold" }}>Item</span>
        </button>
      </div>

      {/* Render the list of products */}
      <div
        className="row justify-content-around mt-5 d-flex flex-wrap"
        style={{ width: "100%", justifyContent: "space-around", paddingLeft: "17px" }}
      >
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.listingId}>
            <div
              className="card h-100 d-flex flex-column position-relative"
              onClick={() => handleCardClick(product)}
              style={{ cursor: "pointer" }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
              </div>

              {/* Requested Tag */}
              {product.isRequested && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#2B303A", // Same color as the buttons
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Requested
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected product */}
      {selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{
              maxWidth: "800px",
              width: "100%",
              minWidth: "600px",
              margin: "auto",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minHeight: "400px",
            }}
          >
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "400px",
              }}
            >
              <div style={{ width: "50%", overflow: "hidden" }}>
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>

              <div
                className="modal-body"
                style={{
                  padding: "20px",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                {/* Display Requested Tag in modal */}
                {selectedProduct.isRequested && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "40px",
                      backgroundColor: "#2B303A",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Requested
                  </div>
                )}

                <div>
                  <h2 style={{ marginBottom: "10px", whiteSpace: "nowrap" }}>
                    {selectedProduct.title}
                  </h2>
                  <h6
                    style={{
                      color: "#888",
                      marginBottom: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Owner: cck226@lehigh.edu
                  </h6>
                  <p style={{ whiteSpace: "nowrap" }}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* I Can Help Button */}
                <button
                  type="button"
                  className="btn"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "10px",
                    backgroundColor: "#2B303A", // Same color as other buttons
                    color: "white",
                  }}
                  onClick={() =>
                    alert("The owner of the post has been notified!")
                  }
                >
                  I can help!
                </button>

                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductListing;
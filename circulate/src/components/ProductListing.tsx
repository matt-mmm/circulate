import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import debounce from "lodash.debounce";
import Footer from "./Footer.tsx";

// Interface for the Product type
interface Product {
  listingId: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ProductListing: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State to hold the list of products
  const [products, setProducts] = useState<Product[]>([]);

  const [isGenerating, setIsGenerating] = useState(false); // For tracking if the description is being generated

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the API
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

  // Function to generate description using OpenAI API
  const generateDescription = async (title: string) => {
    if (title.trim() === "") {
      setDescription("");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Write a brief and compelling product description for a listing titled "${title}".`;

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

  return (
    <div style={{ width: "100%" }}>
      {/* Centered button for creating a new listing */}
      <div className="d-flex justify-content-center mb-4" style={{ paddingTop: "15px" }}>
        <button
          style={{ backgroundColor: "#565857", borderColor: "#565857", color: "white" }}
          className="btn"
          onClick={() => setShowModal(true)}
        >
          Create a New Listing
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a New Listing</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the title of the listing"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description will be generated based on the title"
                      required
                      disabled={isGenerating}
                    ></textarea>
                    {isGenerating && (
                      <div className="form-text text-muted">Generating description...</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imageUpload" className="form-label">
                      Upload an Image:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageUpload"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                  <button type="submit" className="btn btn-success" disabled={isGenerating}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render the list of products */}
      <div
        className="row justify-content-around mt-5 d-flex flex-wrap"
        style={{ width: "100%", justifyContent: "space-around", paddingLeft: "17px" }}
      >
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.listingId}>
            <div
              className="card h-100 d-flex flex-column"
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
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="img-fluid mb-3"
                />
                <p>{selectedProduct.description}</p>
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
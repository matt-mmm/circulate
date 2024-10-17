import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import debounce from "lodash.debounce";

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

  // Handle image upload and analyze the image
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);

      // Call the function to analyze the image and auto-fill title and description
      await analyzeImage(file);
    }
  };

  // Function to analyze the image and generate title and description
  const analyzeImage = async (file: File) => {
    const toBase64 = (file: File) =>
      new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const imageData = await toBase64(file);

    // Now send the image to an image recognition API and OpenAI API for text generation
    if (imageData) {
      try {
        // Replace this with your image recognition API endpoint
        const imageAnalysisResult = await fetch(
          "https://your-image-recognition-api-endpoint",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageData }),
          }
        );

        const imageDescription = await imageAnalysisResult.json();

        // Now use OpenAI API to generate a title and description
        const gptResponse = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Generate a title and description for this image: ${imageDescription}`,
            max_tokens: 100,
          }),
        });

        const gptData = await gptResponse.json();
        const generatedText = gptData.choices[0].text.trim().split("\n");

        // Set the title and description from GPT's response
        setTitle(generatedText[0]);
        setDescription(generatedText.slice(1).join(" "));
      } catch (error) {
        console.error("Error analyzing image and generating text:", error);
      }
    }
  };

  // Generate description using OpenAI API
  const generateDescription = async (title: string) => {
    if (title.trim() === "") {
      setDescription("");
      return;
    }
  
    setIsGenerating(true);
  
    try {
      const prompt = `Write a brief and compelling product description for a listing titled "${title}".`;
  
      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", { // Correct endpoint for chat models
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Ensure your API key is set
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",  // Using the new chat-based model
          messages: [{ role: "user", content: prompt }],  // Correct format for chat models
          max_tokens: 60,
        }),
      });
  
      const gptData = await gptResponse.json();
  
      // Check if the response contains the expected data
      if (gptData && gptData.choices && gptData.choices.length > 0) {
        const generatedDescription = gptData.choices[0].message.content.trim(); // Correct response structure
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
    debounce(generateDescription, 1000), // 1 second debounce delay
    []
  );

  // Handle description focus to generate description
  const handleDescriptionFocus = () => {
    // Only generate the description if it's currently empty and the title exists
    if (!description.trim() && title.trim()) {
      generateDescriptionDebounced(title); // Trigger description generation based on the title
    }
  };

  // Handle form submission to create a new listing
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

  // Handle card click to show product details
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Close the product detail modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      {/* Centered button for creating a new listing */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary"
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
                      onFocus={handleDescriptionFocus}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Click here to generate a description"
                      required
                      disabled={isGenerating}
                    ></textarea>
                    {isGenerating && (
                      <div className="form-text text-muted">
                        Generating description...
                      </div>
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isGenerating}
                  >
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
      <div className="row mt-5 d-flex flex-wrap">
        {products.map((product) => (
          <div className="col-md-4" key={product.listingId}>
            <div
              className="card h-100 mb-4 d-flex flex-column"
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
    </div>
  );
};

export default ProductListing;
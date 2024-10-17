import React, { useState, useEffect, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import debounce from "lodash.debounce";
import Footer from "./Footer.tsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Import MUI info icon
import CloseIcon from "@mui/icons-material/Close"; // Import MUI close icon

// Interface for the Product type
interface Product {
  listingId: string;
  title: string;
  description: string;
  imageUrl: string;
  isAnonymous?: boolean; // Add anonymous flag to each product
  isRequested?: boolean;
}

const ProductListing: React.FC = () => {

  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
   // Toggle between Listing and Requesting
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false); // Toggle between anonymous or not
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State to hold the list of products

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
        const updatedProducts = data.map((product: Product, index: number) => ({
          ...product,
          isRequested: index % 2 === 0, // Simulate some products as requested
          isAnonymous: index % 3 !== 0, // Simulate some products as anonymous
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
  const [title, setTitle] = useState<string>("");
  const [isListing, setIsListing] = useState<boolean>(true);

  const [description, setDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false); // For tracking if the description is being generated

  // Function to generate description using OpenAI API
  const generateDescription = async (title: string) => {
    if (title.trim() === "") {
      setDescription("");
      return;
    }

    setIsGenerating(true);

    try {
      // Adjust the prompt based on isListing
      let prompt = "";
      if (isListing) {
        prompt = `Write a very brief casual description of the given listing title with the intent of being given away but don't add any unnecessary commentary: "${title}".`;
      } else {
        prompt = `Write a very brief casual description of the request listing title with the intent of getting the item but don't add any unnecessary commentary: "${title}".`;
      }

      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        }),
      });

      const gptData = await gptResponse.json();

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

  // Debounced function for title changes
  const debouncedGenerateDescription = useMemo(
    () =>
      debounce((title: string) => {
        generateDescription(title);
      }, 1000),
    []
  );

  // Effect for title changes
  useEffect(() => {
    if (title.trim()) {
      debouncedGenerateDescription(title);
    } else {
      setDescription("");
    }
  }, [title, debouncedGenerateDescription]);

  // Effect for isListing changes
  useEffect(() => {
    if (title.trim()) {
      generateDescription(title);
    }
  }, [isListing]);

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
          isAnonymous, // Include isAnonymous in the request body
        }),
      }
    );

    if (response.ok) {
      // Reset form fields and close modal
      setTitle("");
      setIsListing(true);
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
    <div style={{ width: "100%", backgroundColor: '#D3D3D3' }}>
      {/* Centered buttons for creating a new listing and requesting an item */}
      <div
        className="d-flex justify-content-center mb-4"
        style={{ paddingTop: "50px", width: "100%", backgroundColor: '#D3D3D3' }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsListing(true);
            setShowModal(true);
          }}
          style={{
            backgroundColor: "#2B303A",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          Create a Listing
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsListing(false);
            setShowModal(true);
          }}
          style={{
            backgroundColor: "#2B303A",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Request an Item
        </Button>
      </div>

      {/* Modal using MUI */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="md">
        <DialogTitle
          style={{
            backgroundColor: "#2B303A",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {isListing ? "Create a New Listing" : "Request an Item"}
        </DialogTitle>
        <DialogContent style={{ padding: "30px" }}>
          <FormControlLabel
            control={<Switch checked={!isListing} onChange={(() => setIsListing(!isListing))} />}
            label={isListing ? "Listing Mode" : "Request Mode"}
            style={{ marginBottom: "20px" }}
          />

          {/* Anonymous Toggle with Tooltip */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Switch checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
              }
              label="Post Anonymously"
            />
            <Tooltip
              title="When the post is anonymous, the creator's name won't be visible. They can see users who interact with the post before deciding to contact them."
              placement="top"
              arrow
            >
              <InfoIcon
                style={{
                  fontSize: "20px",
                  color: "#888",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </div>

          <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Enter the title of the ${isListing ? "listing" : "request"}`}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description will be generated based on the title"
          margin="normal"
          required
          disabled={isGenerating}
          InputProps={{
            endAdornment: isGenerating ? <CircularProgress size={20} /> : null,
          }}
        />

          {isListing && (
            <TextField
              fullWidth
              type="file"
              inputProps={{
                accept: "image/*",
              }}
              onChange={handleImageChange}
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="white" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#006600", color: "white" }}
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render the list of products */}
      <div
        className="row justify-content-around mt-5 d-flex flex-wrap"
        style={{ width: "100%", justifyContent: "space-around", paddingLeft: "17px", backgroundColor: '#D3D3D3' }}
      >
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.listingId}>
            <div
              className="card h-100 d-flex flex-column position-relative"
              onClick={() => handleCardClick(product)}
              style={{ cursor: "pointer" }}
            >
              {product.isRequested && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#565857",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Requested
                </div>
              )}
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

      {/* Selected Product Modal */}
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
                  {selectedProduct.isAnonymous && (
                    <h6
                      style={{
                        color: "#888",
                        marginBottom: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Owner: cck226@lehigh.edu
                    </h6>
                  )}  
                  <p style={{ whiteSpace: "nowrap" }}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* I Can Help Button */}
                {selectedProduct.isRequested && (
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
                )} 
                {!selectedProduct.isRequested && (
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
                    I am interested!
                  </button>
                )} 
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
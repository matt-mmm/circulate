import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
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
      setTitle("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchProducts(); // Refresh products after creating a new listing
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
    <div className="container mt-4">
      {/* Centered button to create a new listing */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Button
          variant="contained"
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#8BD0F8",
            color: "#fff",
            padding: "20px 40px",  // Increased padding
            fontSize: "20px",      // Increased font size
            height: "70px",        // Increased button height
          }}
        >
          Create a New Listing
        </Button>
      </div>

      {/* Modal for creating a new listing */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create a New Listing
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: "16px" }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render the list of products using MUI Cards */}
      <Grid container spacing={4} sx={{ marginTop: "30px", paddingLeft: 5, paddingRight: 5 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.listingId}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
              onClick={() => handleCardClick(product)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.title}
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for viewing product details */}
      {selectedProduct && (
        <Dialog open={Boolean(selectedProduct)} onClose={closeProductModal} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct.title}</DialogTitle>
          <DialogContent>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Typography variant="body1">{selectedProduct.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeProductModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProductListing;
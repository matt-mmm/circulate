import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: string;
  title: string;
  description: string;
  imageData: string; // Base64 image data
}

const ProductListing: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // State to hold the list of products
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the backend
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

    // Convert image file to base64
    const toBase64 = (file: File) =>
      new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const imageData = image ? await toBase64(image) : null;

    // Call the API Gateway endpoint
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
      console.log("Form submitted successfully");

      // Clear form fields
      setTitle("");
      setDescription("");
      setImage(null);
      setShowModal(false); // Close modal after successful submission

      // Fetch the updated list of products
      fetchProducts();
    } else {
      console.log("Form submission failed");
    }
  };

  return (
    <div className="container mt-4">
      <button
        className="btn float-end"
        onClick={() => setShowModal(true)}
        style={{ backgroundColor: "#8BD0F8", color: "#fff" }}
      >
        Create a New Listing
      </button>

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
                      placeholder="Enter the description of the listing"
                      required
                    ></textarea>
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
                  <button type="submit" className="btn btn-primary">
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
      <div className="row mt-5">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              {product.imageData && (
                <img
                  src={product.imageData}
                  className="card-img-top"
                  alt={product.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

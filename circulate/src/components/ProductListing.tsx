import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductListing: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert image file to base64 for easy upload
    const toBase64 = (file: File) =>
      new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const imageData = image ? await toBase64(image) : null;

    // Call the API Gateway endpoint
    const response = await fetch("https://zth2fyccjk.execute-api.us-east-2.amazonaws.com/prod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageData,
      }),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      // Clear form fields
      setTitle(""); 
      setDescription("");
      setImage(null);
    } else {
      console.log("Form submission failed");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Create a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <textarea
            className="form-control"
            id="title"
            name="title"
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of the listing"
          ></textarea>
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
      </form>
    </div>
  );
};

export default ProductListing;

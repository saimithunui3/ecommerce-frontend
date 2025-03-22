import React, { useState } from "react";
import './AddProduct.css';
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "", description: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first to add a product.");
      return;
    }

    axios.post("http://localhost:8080/api/products", product, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setMessage("✅ Product added successfully!");
      setProduct({ name: "", price: "", description: "" });
    }).catch((error) => {
      console.error("Error adding product:", error);
      setMessage("❌ Failed to add product.");
    });
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
        <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
        <textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;

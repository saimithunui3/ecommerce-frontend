import './Products.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login.");
        return;
      }

      try {
        const response = await axios.get("https://ecommerce-backend-2-zjl2.onrender.com/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Check authentication.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>🛍️ Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="150" />}
            <br />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

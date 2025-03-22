import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li className="cart-item" key={index}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} width="150" height="150" />
              )}
              <br />
              <button className="remove-btn" onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

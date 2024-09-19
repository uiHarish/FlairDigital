import React from 'react';
import './Cart.scss'; 

const Cart = ({ cart, onClose }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <button onClick={onClose}>Close</button>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

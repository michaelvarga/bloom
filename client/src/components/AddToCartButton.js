import React, { useState, useEffect } from 'react';
import "../index.scss";

const AddToCartButton = ({ item, notifySuccess, notifyError }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('bloom-cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleAddToCart = () => {
    const existingCartItems = cartItems.find(cartItem => cartItem.plantId === item.plantId)

    if (existingCartItems) {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.plantId === item.plantId) {
          return { ...cartItem, quantity: cartItem.quantity + item.quantity};
        }
        return cartItem
      });

      setCartItems(updatedCartItems);
      localStorage.setItem('bloom-cart', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, item]
      setCartItems(updatedCartItems);
      localStorage.setItem('bloom-cart', JSON.stringify(updatedCartItems));
    }
    notifySuccess();
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
  );
};

export default AddToCartButton;

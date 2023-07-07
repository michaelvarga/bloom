import React, { useState, useEffect } from 'react';
import "../index.scss";

const AddToCartButton = ({ item, notifySuccess, notifyError }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleAddToCart = () => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    // localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('cartItems', JSON.stringify(["Test Plant 3"]));
    notifySuccess();
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
  );
};

export default AddToCartButton;

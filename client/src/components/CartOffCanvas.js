import { useState, useEffect } from "react";
import axios from "axios";
import "../index.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaPlus, FaMinus } from "react-icons/fa";
import CartItem from "./CartItem";

function CartOffCanvas({ handleClose, show, cart, ...props }) {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const getTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      total += (item.quantity * item.price)
    }
    setTotalPrice(total)
    console.log("TOTAL PRICE", totalPrice)
  }

  useEffect(() => {
    const storedCartItems = localStorage.getItem('bloom-cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
    getTotal();

  }, []);

  useEffect(() => {
    let total = 0;
    for(const item of cartItems) {
      total += (item.quantity * item.price)
    }
    setTotalPrice(total)
    console.log("TOTAL PRICE", cartItems)
  }, [cartItems])


  const handleIncrement = (plantId) => {
    const updated = cartItems.map(item => {
      if (item.plantId === plantId) {
        return { ...item, quantity: item.quantity + 1}
      }
      return item;
    });
    setCartItems(updated);
    getTotal();
    localStorage.setItem('bloom-cart', JSON.stringify(updated));
  };

  const handleDecrement = (plantId) => {
    const updated = cartItems.map(item => {
      if (item.plantId === plantId && item.quantity >= 1) {
        return { ...item, quantity: item.quantity - 1}
      }
      return item;
    });
    setCartItems(updated);
    getTotal();
    localStorage.setItem('bloom-cart', JSON.stringify(updated));
  };

  const handleDelete = (plantId) => {
    const updated = cartItems.filter((item) => item.plantId !== plantId);
    setCartItems(updated);
    getTotal();
    localStorage.setItem('bloom-cart', JSON.stringify(updated))
  }

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        id="cart-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>Your Cart</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems?.length !== 0 ? (
            <div>
              {cartItems?.map((item, index) => (
                <CartItem item={item} handleIncrement={handleIncrement} handleDecrement={handleDecrement} handleDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <h4>Oh no! Your cart is empty</h4>
          )}
        </Offcanvas.Body>
        <div className="offcanvas-footer m-3 p-3">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <button className="w-100 mt-3" onClick={() => getTotal()}>
            CHECKOUT
          </button>
        </div>
      </Offcanvas>
    </>
  );
}

export default CartOffCanvas;

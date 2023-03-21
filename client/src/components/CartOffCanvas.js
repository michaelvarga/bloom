import { useState, useEffect } from "react";
import axios from "axios";
import "../index.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaPlus, FaMinus } from "react-icons/fa";

function CartOffCanvas({ handleClose, show, cart, ...props }) {
  const [cartItems, setCartItems] = useState(cart);
  const [total, setTotal] = useState(0);

  const handleQuantityChange = async (index, value) => {
    const newCartItems = [...cartItems];

    try {
      if (value === -1 && newCartItems[index].quantity > 1) {
        newCartItems[index].quantity--;
        await axios.put(`http://localhost:8080/api/cart_items/dec/${newCartItems[index].id}`);
      } else if (value === 1) {
        newCartItems[index].quantity++;
        await axios.put(`http://localhost:8080/api/cart_items/inc/${newCartItems[index].id}`);
      }


      console.log("Updated!");
    } catch (err) {
      console.error(err);
    }

    setCartItems(newCartItems);
    getTotal();
    // make an API call to update quantity to new quantity
    // create API route for PUT of cart_item
  };

  const handleDelete = async (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    getTotal();

    // make an API route to delete cart item by id
    // make delete call of cart_item
    try {
      await axios.delete(`http://localhost:8080/api/cart_items/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.plant.price * item.quantity;
    });
    console.log("TOTAL PRICE", totalPrice);
    setTotal(totalPrice);
  };

  useEffect(() => {
    setCartItems(cart);
    setTotal();
  }, [cart]);

  useEffect(() => {
    if (!cartItems) return;
    getTotal();
  }, [cartItems]);

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
                <div key={item.id} className="w-100 d-flex pb-4 pt-4 cart-item">
                  <img src={item.plant.imgUrl} className="me-3" />
                  <div className="me-3 w-100">
                    <div className="d-flex justify-content-between">
                      <span>{item.plant.name}</span>
                      <span>${item.plant.price}</span>
                    </div>
                    <p>{item.color}</p>
                    <div className="d-flex justify-content-between">
                      <div className="quantity-btn d-flex justify-content-center align-items-center text-center p-1">
                        <button>
                          <FaMinus
                            onClick={() =>
                              handleQuantityChange(index, -1)
                            }
                          />
                        </button>
                        <span className="mb-1">{item.quantity}</span>
                        <button>
                          <FaPlus
                            onClick={() => handleQuantityChange(index, 1)}
                          />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="remove-btn"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h4>Oh no! Your cart is empty</h4>
          )}
        </Offcanvas.Body>
        <div className="offcanvas-footer m-3 p-3">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${total}</span>
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

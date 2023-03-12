import { useState, useEffect } from "react";
import axios from "axios";
import "../index.scss";
import Offcanvas from "react-bootstrap/Offcanvas";

function CartOffCanvas({ handleClose, show, cart, ...props }) {
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
          {cart == null ? (
            <h4>Oh no! Your cart is empty</h4>
          ) : (
            <div>
              {cart?.map((item) => (
                <div className="w-100 d-flex pb-4">
                  <img src={item.plant.imgUrl} className="me-3" />
                  <div className="me-3 w-100">
                    <div className="d-flex justify-content-between">
                      <span>{item.plant.name}</span>
                      <span>${item.plant.price}</span>
                    </div>
                    <p>{item.color}</p>
                    <div>{item.quantity}</div>
                  </div>
                  {/* {plant.id} */}
                </div>
              ))}
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffCanvas;

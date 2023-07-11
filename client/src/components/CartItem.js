import "../index.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";

const CartItem = ({ item, handleIncrement, handleDecrement, handleDelete }) => {
  return (
    <div key={item.plantId} className="w-100 d-flex pb-4 pt-4 cart-item">
      <img src={item.imgUrl} className="me-3" />
      <div className="me-3 w-100">
        <div className="d-flex justify-content-between">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
        <div className="d-flex justify-content-between">
          <div className="quantity-btn d-flex justify-content-center align-items-center text-center p-1">
            <button>
              <FaMinus onClick={() => handleDecrement(item.plantId)} />
            </button>
            <span className="mb-1">{item.quantity}</span>
            <button>
              <FaPlus onClick={() => handleIncrement(item.plantId)} />
            </button>
          </div>
          <button
            onClick={() => handleDelete(item.plantId)}
            className="remove-btn"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import "../index.scss";
import Offcanvas from 'react-bootstrap/Offcanvas';

function CartOffCanvas({ handleClose, show, ...props }) {


  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props} id="cart-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>Your Cart</h3></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          CART ITEMS WILL GO HERE
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffCanvas

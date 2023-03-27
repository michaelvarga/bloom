import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../index.scss";
import { FiSearch, FiUser, FiUserCheck, FiShoppingCart } from "react-icons/fi";

function NavBar({ auth, handleShowCart }) {

  return (
    <>
      <Navbar expand="lg" className="navbar" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/" className="logo">
            bloom marketplace
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                bloom marketplace
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-center flex-grow-1"
                id="link-container"
              >
                <Nav.Link href="/plants" className="nav-link">
                  Plants
                </Nav.Link>
                <Nav.Link href="/about" className="nav-link">
                  About
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  id="nav-search"
                />
                <button className="nav-btn me-3">
                  <FiSearch className="bttn" />
                </button>
              </Form>
              <button className="nav-btn me-2">
                <Nav.Link href="/my-profile">
                  {auth ? (
                    <FiUserCheck className="bttn" />
                  ) : (
                    <FiUser className="bttn" />
                  )}
                </Nav.Link>
              </button>
              <button className="nav-btn me-2">
                <FiShoppingCart className="bttn" onClick={handleShowCart} />
              </button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

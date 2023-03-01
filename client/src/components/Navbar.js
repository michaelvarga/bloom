import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../index.scss'
import {FiSearch} from 'react-icons/fi'

function NavBar() {
  return (
    <>
        <Navbar expand='lg' className="navbar" sticky="top">
          <Container fluid>
            <Navbar.Brand href="/" className="logo">bloom marketplace</Navbar.Brand>
            <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
            <Navbar.Offcanvas
              id='offcanvasNavbar-expand-lg'
              aria-labelledby='offcanvasNavbarLabel-expand-lg'
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
                  bloom marketplace
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1" id="link-container">
                  <Nav.Link href="/plants" className="nav-link">Plants</Nav.Link>
                  <Nav.Link href="/about" className="nav-link">About</Nav.Link>
                  {/* <NavDropdown
                    title="Dropdown"
                    id='offcanvasNavbarDropdown-expand-lg'
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    id="nav-search"
                  />
                  {/* <FiSearch id="search-btn"/> */}
                  <Button id="search-btn"><FiSearch id="btn"/></Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default NavBar;

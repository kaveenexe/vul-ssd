import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "../../images/LOGO.png";

function NavigationBar() {

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-0">
          <Container fluid>
            <Navbar.Brand
              href="../../home"
              style={{ color: "#25D828", fontWeight: 600 }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "3rem",
                  marginRight: "0.6rem",
                  marginBottom: "0.2rem",
                }}
              />
              HerbMart
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  HerbMart
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="../../home">Home</Nav.Link>
                  <Nav.Link href="#cart">Cart</Nav.Link>
                  <NavDropdown
                    title="Catagories"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/herbal-beauty-products">
                      Herbal Beauty Products
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/herbal-hair-products">
                      Herbal Hair Products
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/other">Other</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="../../profile">Profile</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavigationBar;

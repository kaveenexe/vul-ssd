import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../images/LOGO.png";
import "./styles.css"; // Import the CSS file

function NavigationBar() {
  return (
    <Navbar className="custom-navbar shadow-sm" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link">
              HOME
            </Nav.Link>
            <Nav.Link href="/" className="nav-link">
              ABOUT US
            </Nav.Link>
            <Nav.Link href="/" className="nav-link">
              PRODUCTS
            </Nav.Link>
            <Nav.Link href="/" className="nav-link">
              OFFERS
            </Nav.Link>
            <Nav.Link href="/" className="nav-link">
              CONTACT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

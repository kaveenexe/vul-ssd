import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Logo from "./images/LOGO.png";
const { Link } = require("react-router-dom");

const API_BASE = "http://localhost:8080";

const NavBar = ({ cartCount, setCartCount, fetchCartCount, isSeller, setStatus, status, logOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartCount();
  }, [cartCount]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          href="/"
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
        <nav style={{ textAlign: "center", marginTop: "20px", display: "flex"}}>
          <Link
            to="/"
            style={{ padding: "10px", textDecoration: "none", color: "#000" }}
          >
            Home
          </Link>
          {/* <DropdownButton id="dropdown-basic-button" title="Catagories">
            <Dropdown.Item href="/herbal-beauty">
              Herbal Beauty Products
            </Dropdown.Item>
            <Dropdown.Item href="/herbal-hair">
              Herbal Hair Products
            </Dropdown.Item>
            <Dropdown.Item href="/other">Other</Dropdown.Item>
          </DropdownButton> */}
          {status ? (
            <Link
              to="/my-account"
              style={{ padding: "10px", textDecoration: "none", color: "#000" }}
            >
              Profile
            </Link>
          ) : null}

          {isSeller ? (
            <Link
              to="/add-food"
              style={{ padding: "10px", textDecoration: "none", color: "#000" }}
            >
              Add Food
            </Link>
          ) : null}

          <Link
            to="/register"
            style={{ padding: "10px", textDecoration: "none", color: "#000" }}
          >
            Register
          </Link>
          {!status ? (
            <Link
              to="/login"
              style={{ padding: "10px", textDecoration: "none", color: "#000" }}
            >
              Login
            </Link>
          ) : (
            <span className="d-flex justify-content-center align-items-center">
              <Link
                to="/login"
                style={{
                  padding: "10px",
                  textDecoration: "none",
                  color: "#000",
                }}
                onClick={logOut}
              >
                Logout
              </Link>
              <Link to={`/cart/${localStorage.getItem('username')}`}>
                <Badge badgeContent={cartCount} color="primary">
                    <MailIcon color="action" />
                </Badge>
            </Link>
              
            </span>
          )}

          
        </nav>


      </Container>
    </Navbar>
  );
};

export default NavBar;

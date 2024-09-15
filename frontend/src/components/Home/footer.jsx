import React from "react";
import Logo from "../../images/LOGO.png";
import { UilHome, UilPhone, UilEnvelope } from '@iconscout/react-unicons'

const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4"
    style={{ backgroundColor: "#e9ede8", marginTop: "2rem" }}
  >
    <div className="container-fluid text-center text-md-left">
      <div className="row" style={{ justifyContent: "space-around" }}>
        <div className="col-md-4 mt-md-0 mt-3">
          <h5
            className="text-start"
            style={{ color: "#25D828", fontWeight: 600, cursor: "pointer" }}
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
          </h5>
          <p className="text-start">
            Experience the power of nature with our hand-selected herbs and
            botanicals. Shop our online store and discover the benefits of
            natural remedies. Join our community and embrace a healthier, more
            vibrant life!
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3 text-start">
          <h5 className="text-uppercase ">Products</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/herbal-beauty" style={{textDecoration: "none", color: "black"}}>Herbal Beauty Products</a>
            </li>
            <li>
              <a href="/herbal-hair" style={{textDecoration: "none", color: "black"}}>Herbal Hair Products</a>
            </li>
            <li>
              <a href="/other" style={{textDecoration: "none", color: "black"}}>Other</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3 text-start">
          <h5 className="text-uppercase">Contact</h5>
          <ul className="list-unstyled">
            <li>
              <p><UilHome size="25" style={{marginRight: "0.3rem", marginBottom: "0.1rem"}}/>100, Colombo Sri Lanka</p>
            </li>
            <li>
              <p><UilEnvelope size="25" style={{marginRight: "0.3rem", marginBottom: "0.1rem"}} />info@mail.com</p>
            </li>
            <li>
              <p><UilPhone size="25" style={{marginRight: "0.3rem", marginBottom: "0.1rem"}}/>011 2 345 678</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      className="footer-copyright text-center py-3"
      style={{ backgroundColor: "#c9cfc8" }}
    >
      © 2023 Copyright:
      <a href="/" style={{textDecoration: "none", color: "black"}}> HerbMart</a>
    </div>
  </footer>
);

export default Footer;

import React from "react";
import banner from "../images/custdb.jpg";
import "../styles/customerDashboard.css";

class Banner extends React.Component {
  render() {
    return (
      <div>
        <div className="img_container">
          <img class="cust_banner" src={banner} alt="customer dashboard" />
          <div className="centered_text">Dashboard</div>
        </div>
      </div>
    );
  }
}

export default Banner;
import React from "react";

import HomeBanner from "../components/Home/banner";
import Wrapper from "../components/Home/wrapper";
import HomeProduct from "../components/Home/productcard";
import Footer from "../components/Home/footer";
// import { Button } from "react-bootstrap";
// import HomeProduct from "./homeproduct";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      
      < HomeBanner/>
      <Wrapper />
      <hr />
      {/* <Link to={HomeProduct}>
        <Button variant="primary">View All</Button>
      </Link> */}
      <HomeProduct />
      <Footer />
    </div>
  );
}

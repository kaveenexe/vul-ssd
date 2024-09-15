import React from "react";

export default function Product(props) {
  const {product} = props;
  return (
    <div>
      <div className="d-flex flex-row">
        <img src="" alt="" />
        <div>
          <h3>{product.title}</h3>
          <h5>{product.category}</h5>
          <h6 style={{fontWeight: "700"}}>Product Description<hr/></h6>
          <p style={{marginLeft: "0.2rem"}}>{product.description}</p>
          <p>LKR {product.price}</p>
        </div>
      </div>
    </div>
  );
}

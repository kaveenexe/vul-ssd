import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Editproducts from "./EditProducts";
import axios from "axios";


function ProductDetails() {
  // const history = useHistory();
  const navigate = useNavigate();

  //get user details
  const [userDetails, setUserDetails] = useState({});
  const uid = localStorage.getItem("username");

  // const loadUserData = async () => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/api/get-user-details",
  //     data: {
  //       username: uid,
  //     },
  //   }).then((data) => {
  //     console.log(data.data);
  //     setUserDetails(data.data);
  //   });
  // };

  //now
  const loadUserData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/get-user-details", {
        username: uid,
      });
      const userData = response.data;
      setUserDetails(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  //get products by uesr id
  // const [Product, setProduct] = useState([]);
  // const getProducts = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:9020/api/user/${userDetails.id}`  
  //     );
  //     const jsonData = await response.json();
  //     console.log(jsonData);
  //     return jsonData;
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  //now get products by user id
  const [Product, setProductList] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:9020/api/user/${userDetails.id}`);
      const productData = response.data;
      setProductList(productData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete products by user id
  // const deleteProduct = async (productId) => {
  //   try {
  //     await axios.delete(`http://localhost:9020/api/product/${productId}`);
  //     setProduct(Product.filter((product) => product._id !== productId));
  //     console.log("Product deleted successfully!");
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // const deleteProduct = async (productId) => {
  //   try {
  //     await axios.delete(`http://localhost:9020/api/product/${productId}`);
  //     setProductList(prevProducts => prevProducts.filter(product => product._id !== productId));
  //     console.log("Product deleted successfully!");
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:9020/api/delete/${productId}`);
      console.log("Product deleted successfully!");
      // Perform any additional actions after successful deletion
    } catch (err) {
      console.error(err.message);
      // Handle error if the deletion fails
    }
  };

  useEffect(() => {
    getProducts();
  }, [userDetails]);

  



  return (
    <div>
      {Product.map((product) => (
        <div key={product._id}>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            {/* <Card.Img variant="top" src={<CloudinaryImage publicId={product.image} />} /> */}
            <Card.Img
                src={product.image}
                variant="top"
                style={{ height: "200px" }}
              />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              {/* <Card.Text>
                {product.category} <br/>
                LKR {product.price} <br/>
                {product.description} <br/>
                 <br />
              </Card.Text> */}
              <Card.Text
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.description}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.category}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  LKR {product.price}
                </Card.Subtitle>
              {/* <Button variant="primary" onClick={() => history.push('/EditProducts')}>
          Edit
        </Button> */}
              {/* <Button variant="primary" onClick={ ()=>navigate(`/EditProducts/`)}>Edit</Button>
        <Editproducts/>
        <Button variant="primary">Delete</Button> */}
              <Button
                variant="primary"
                onClick={() => navigate(`/edit-product/`)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          
        </div>
      ))}
      {/* <h1>{userDetails.id}</h1> */}
    </div>
  );
}

export default ProductDetails;

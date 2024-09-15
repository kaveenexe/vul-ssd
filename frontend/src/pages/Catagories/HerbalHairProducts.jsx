import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Banner from "../../components/Home/banner";
import Footer from "../../components/Home/footer";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Product from "../../components/Home/product";
import { useNavigate } from "react-router-dom";
import { UilShoppingCart } from "@iconscout/react-unicons";
import Axios from "axios";

export default function Beauty() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  console.log(query);

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9020/api/foods/Herbal Hair products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Banner />

      <div className="product_cards">
        {products.map((product) => (
          <div key={product._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                src={product.image}
                variant="top"
                style={{ height: "200px" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
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
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Product product={selectedProduct} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Reviews
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <UilShoppingCart size="20" />
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Product
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

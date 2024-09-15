import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";
const HomeProduct = () => {
  const navigate = useNavigate();

  const [homeFoodData, setHomeFoodData] = useState([]);
  const [homeFoodLoading, setHomeFoodLoading] = useState(true);

  const token = localStorage.getItem("rfkey");

  const fetchFoodData = async () => {
    setHomeFoodLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:9020/api/foods"
      );
      setHomeFoodData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setHomeFoodLoading(false);
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("The link was clicked.");
  };

  const addToCart = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="mainDiv">
      <div className="product_cards">
        {homeFoodLoading && <div>Loading</div>}
        {!homeFoodLoading && (
          <div class="grid-container">
            {homeFoodData.map((item) => (
              <Card
                style={{ width: "18rem", height: "20rem", margin: "0 2rem" }}
              >
                <Card.Img
                  className="cardImage"
                  variant="top"
                  src={item.image}
                />
                <div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title >{item.name}</Card.Title>
                    {/* <Card.Text
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.description}
                  </Card.Text> */}

                    <Card.Subtitle className="mb-2 text-muted">
                      LKR {item.price}
                    </Card.Subtitle>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(item._id)}
                    >
                      View Product
                    </Button>
                  </Card.Body>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProduct;

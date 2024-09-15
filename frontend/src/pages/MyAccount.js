import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Banner from "../components/custdb_banner";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const API_BASE = "http://localhost:8080";

const MyAccount = ({ isCustomer }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const key = localStorage.getItem("rfkey");
  const uid = localStorage.getItem("username");
  const [userID, setUserID] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);

  const logOut = async () => {
    const data = await fetch(API_BASE, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uid,
      }),
    }).then(() => {
      localStorage.removeItem("username");
      localStorage.removeItem("rfkey");
      navigate("/");
    });
  };

  const loadUserData = async () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/get-user-details",
      data: {
        username: uid,
      },
    }).then((data) => {
      console.log(data.data);
      setUserDetails(data.data);
    });
  };

  const loadOrdersData = async () => {
    axios.get("http://localhost:8010/order").then((response) => {
      const filteredOrders = response.data.orders.filter(
        (order) => order.userID === uid
      );
      setOrders(filteredOrders);
    });
  };

  useEffect(() => {
    loadUserData();
    loadOrdersData();
  }, []);

  useEffect(() => {
    loadUserData();
  }, []);

  const viewCart = () => {
    const username = localStorage.getItem("username");
    navigate(`/cart/${username}`);
  };


  return (
    <div className="">
      <Banner />
      <div class="card" style={{ margin: "3rem 20rem" }}>
        {/* accordion 01 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>DASHBOARD</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Hello, {userDetails.username}. From your account dashboard, you
              can easily check & view your recent orders, track your orders and
              view your account details from this Dashboard.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* accordion 02 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>ORDERS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {orders.map((order) => (
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#eff5ed",
                    padding: "0.2rem 1rem",
                    marginBottom: "1rem",
                    justifyContent: "space-between",
                  }}
                >
                  <div key={order._id}>
                    <p>
                      Your Order ID: {order._id}{" "}
                      <Badge bg="info"> {order.status}</Badge>
                    </p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Ordered Date: {order.orderedDate}</p>
                    <p>Order Total Price: {order.totalPrice}</p>
                    {/* Display other order details... */}
                  </div>
                  <div>
                    <Button variant="primary" onClick={handleShow}>
                      Track Order
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Order Tracking</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Your order id is {order._id}
                        <br />
                        Your order tracking information is {order.status}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* accordion 03 */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>SETTINGS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="5" controlId="formBasicUsername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userDetails.username}
                    />
                    {/* <Form.Text className="text-muted">
                      Enter your new user name to update.
                    </Form.Text> */}
                  </Form.Group>
                  <Form.Group as={Col} md="5" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={userDetails.email}
                    />
                    {/* <Form.Text className="text-muted">
                      Enter your E-mail to update.
                    </Form.Text> */}
                  </Form.Group>
                </Row>
                {/* <Button type="submit">Update</Button> */}
              </Form>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default MyAccount;

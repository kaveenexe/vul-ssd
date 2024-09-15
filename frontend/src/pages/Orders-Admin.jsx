import "../styles/admin.css";
import { Box } from "@mui/material";
import Header from "../components/Admin/Header";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../components/Admin/UpdateModel";

const Orders = (props) => (
  <tr>
    <td> {props.Orders._id}</td>
    <td> {props.Orders.userID}</td>
    <td> {props.Orders.transactionID}</td>
    <td> {props.Orders.orderedDate}</td>
    <td> {props.Orders.quantity}</td>
    <td> {props.Orders.totalPrice}</td>
    <td> {props.Orders.status}</td>
    <td>
      <a href=" " onClick={() => props.openModal(props.Orders)}></a>
      <a
        href=" "
        onClick={() => {
          props.deleteOrder(props.exercise._id);
        }}
      ></a>
    </td>
  </tr>
);

export default class Orders_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      modalOpen: false,
      orderToUpdate: null,
    };
  }

  openModal = (order) => {
    this.setState({ modalOpen: true, orderToUpdate: order });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, orderToUpdate: null });
  };

  updateOrder = () => {
    const { orderId, status } = this.state;
    axios
      .put(`http://localhost:8000/order/updateOrderStatus/:id`, {
        status,
      })
      .then((response) => {
        console.log(response.data);
        // Update the order status in the Orders_Admin component's state
        this.props.UpdateOrderStatus(orderId, status);
        // Close the modal
        this.props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/order/getAllOrders")
      .then((response) => {
        this.setState({ Orders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPosts() {
    axios
      .get("http://localhost:8000/order/getAllOrders")
      .then((response) => {
        this.setState({ Orders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteOrder(id) {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:8000/order/removeOrder/" + id)
        .then((response) => {
          console.log(response.data);
        });

      this.setState({
        Orders: this.state.Orders.filter((el) => el._id !== id),
      });
    }
  }

  OrdersList() {
    return this.state.Orders.map((currentOrders) => {
      return (
        <Orders
          Orders={currentOrders}
          removeCustomer={this.deleteOrder}
          updateStatus={this.updateOrder}
          openModal={this.openModal}
          key={currentOrders._id}
        />
      );
    });
  }

  render() {
    return (
      <Box m="0.0rem 0.0rem">
        <Header title="ORDERS" subtitle="List of Orders" />
        <div className="container">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Transaction ID</th>
                <th>Ordered Date</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Orders.map((props) => (
                <tr>
                  <td>{props._id}</td>
                  <td>{props.userID}</td>
                  <td>{props.transactionID}</td>
                  <td>{props.orderedDate}</td>
                  <td>{props.quantity}</td>
                  <td>{props.totalPrice}</td>
                  <td>{props.status}</td>
                  <td>
                    <a href="" onClick={() => this.updateOrder}>
                      <EditOutlinedIcon className="editIcon" />
                    </a>
                    <a
                      href=""
                      onClick={() => {
                        this.deleteOrder(props._id);
                      }}
                    >
                      <DeleteOutlineIcon className="deleteIcon" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    );
  }
}

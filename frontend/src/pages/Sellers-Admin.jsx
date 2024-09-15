// import React from "react";
// import { Box } from "@mui/material";
// import Header from "../components/Admin/Header";
// //import { DataGrid } from "@mui/x-data-grid";

// const Sellers = () => {
//   return (
//     <Box m="0.0rem 0.0rem">
//       <Header title="VENDORS" subtitle="List of Vendors" />
//     </Box>
//   );
// };

// export default Sellers;

import "../styles/admin.css";
import { Box } from "@mui/material";
import Header from "../components/Admin/Header";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { Component } from "react";

const Sellers = (props) => (
  <tr>
    <td> {props.Sellers._id}</td>
    <td> {props.Sellers.name}</td>
    <td> {props.Sellers.email}</td>
    <td> {props.Sellers.phone}</td>
    <td> {props.Sellers.role}</td>
    <td>
      <a
        href=" "
        onClick={() => {
          props.removeSeller(props.exercise._id);
        }}
      ></a>
    </td>
  </tr>
);

export default class Sellers_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sellers: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/seller/getAllSellers/")
      .then((response) => {
        this.setState({ Sellers: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPosts() {
    axios
      .get("http://localhost:5000/seller/getAllSellers/")
      .then((response) => {
        this.setState({ Sellers: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeSeller(id) {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:5000/seller/removeSeller/" + id)
        .then((response) => {
          console.log(response.data);
        });

      this.setState({
        Sellers: this.state.Sellers.filter((el) => el._id !== id),
      });
    }
  }

  SellersList() {
    return this.state.Sellers.map((currentSellers) => {
      return (
        <Sellers
          Sellers={currentSellers}
          removeCustomer={this.removeSeller}
          key={currentSellers._id}
        />
      );
    });
  }

  render() {
    return (
      <Box m="0.0rem 0.0rem">
        <Header title="VENDORS" subtitle="List of Sellers" />
        <div className="container">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Seller ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Sellers.map((props) => (
                <tr>
                  <td>{props._id}</td>
                  <td>{props.name}</td>
                  <td>{props.email}</td>
                  <td>{props.phone}</td>
                  <td>{props.role}</td>
                  <td>
                    <a
                      href=""
                      onClick={() => {
                        this.removeSeller(props._id);
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

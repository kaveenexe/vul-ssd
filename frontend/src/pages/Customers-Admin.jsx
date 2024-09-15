import "../styles/admin.css";
import { Box } from "@mui/material";
import Header from "../components/Admin/Header";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { Component } from "react";

const Customers = (props) => (
  <tr>
    <td> {props.Customers._id}</td>
    <td> {props.Customers.name}</td>
    <td> {props.Customers.email}</td>
    <td> {props.Customers.phone}</td>
    <td> {props.Customers.role}</td>
    <td>
      <a href=" " onClick={() => {props.removeCustomer(props.exercise._id)}}></a>
    </td>
  </tr>
);

export default class Customers_Admin extends Component
{
  constructor ( props )
  {
    super( props );

    this.state = {
      Customers: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/customer/getAllCustomers/')
      .then(response => {
          this.setState({ Customers: response.data })
      })
      .catch((error) => {
          console.log(error);
      })
  }

  getPosts() {
    axios.get('http://localhost:5000/customer/getAllCustomers/')
      .then(response => {
          this.setState({ Customers: response.data })
      })
      .catch((error) => {
          console.log(error);
      })
  }

  removeCustomer(id) {
    if (window.confirm('Are you sure?')) {

      axios.delete('http://localhost:5000/customer/removeCustomer/' + id)
          .then(response => { console.log(response.data) });

          this.setState({
            Customers: this.state.Customers.filter(el => el._id !== id)
      })
    }
  }

  CustomersList() {
    return this.state.Customers.map(currentCustomers => {
        return <Customers Customers = { currentCustomers }
        removeCustomer = { this.removeCustomer }
        key = { currentCustomers._id }
        />;
    })
  }
  
  render ()
  {
    return (
      <Box m="0.0rem 0.0rem">
        <Header title="CUSTOMERS" subtitle="List of Customers" />
        <div className="container">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Customers.map((props) => (
                <tr>
                  <td>{props._id}</td>
                  <td>{props.name}</td>
                  <td>{props.email}</td>
                  <td>{props.phone}</td>
                  <td>{props.role}</td>
                  <td>
                    <a href="" onClick={() => {this.removeCustomer( props._id );}}>
                      <DeleteOutlineIcon className="deleteIcon"/>
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
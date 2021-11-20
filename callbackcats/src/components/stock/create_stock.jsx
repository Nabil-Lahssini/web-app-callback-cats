import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeStockName = this.onChangeStockName.bind(this);
    this.onChangeStockQuantity = this.onChangeStockQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      stock_name: "",
      stock_quantity: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeStockName(e) {
    this.setState({
      stock_name: e.target.value,
    });
  }
 
  onChangeStockQuantity(e) {
    this.setState({
      stock_quantity: e.target.value,
    });
  }
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newstock = {
      stock_name: this.state.stock_name,
      stock_quantity: this.state.stock_quantity,
    };
 
    axios
      .post("http://localhost:5000/record/add", newstock)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      stock_name: "",
      stock_quantity: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ margin: "15px"}}>
        <Link to="/stock">
          <Button variant="danger">Go Back</Button>
        </Link>
        <h3>Create New Stock Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.stock_name}
              onChange={this.onChangeStockName}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              value={this.state.stock_quantity}
              onChange={this.onChangeStockQuantity}
            />
          </div>
          
          <br></br>

          <div className="form-group">
            <input
              type="submit"
              value="Create stock"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
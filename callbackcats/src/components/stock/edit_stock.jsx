import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
 
class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeStockName = this.onChangeStockName.bind(this);
    this.onChangeStockQuantity = this.onChangeStockQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      stock_name: "",
      stock_quantity: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          stock_name: response.data.stock_name,
          stock_quantity: response.data.stock_quantity,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditedStock = {
      stock_name: this.state.stock_name,
      stock_quantity: this.state.stock_quantity,
    };
    console.log(newEditedStock);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedStock
      )
      .then((res) => console.log(res.data));
 
    this.props.history.push("/");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Stock Record</h3>
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
          
          <br />
 
          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);
import React from "react";

import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom";


const PlacedOrdersPage = () => {
  return (
    <div style={{ margin: "15px"}}>
      <h1>Orders Management</h1>
      <Link to="/">
        <Button variant="danger">Go Back</Button>
      </Link>
          <h2>Ongoing orders</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order</th>
                <th>Ordered by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tonijn (wit brood)</td>
                <td>Souheib Touri</td>
                <td>
                  <Button variant="success">Process</Button>
                  { ' ' }
                  <Button variant="danger">Cancel</Button>
                </td>
              </tr>
            </tbody>
          </Table>

          <h2>Processed orders</h2>
          <Table variant="success" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order</th>
                <th>Ordered by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tonijn (wit brood)</td>
                <td>Souheib Touri</td>
              </tr>
            </tbody>
          </Table>

          <h2>Cancelled orders</h2>
          <Table variant="danger" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order</th>
                <th>Ordered by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tonijn (wit brood)</td>
                <td>Souheib Touri</td>
              </tr>
            </tbody>
          </Table>
    </div>
  );
};

export default PlacedOrdersPage;
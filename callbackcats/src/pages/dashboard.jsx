import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const DashboardPage = () => {
  return (
    <div style={{ margin: "15px"}}>
      <h1>Dashboard</h1>
      <div className="dashboard_tiles">
        <div className="tile">
          <Link to="/stock">
            <Card className="dashboard_tile">
              <Card.Body>
                <Card.Title>Stock Management</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Stock</Card.Subtitle>
                <Card.Text>
                  Create, edit and delete stock records.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div>
          <Link to="/orders">
            <Card className="dashboard_tile">
              <Card.Body>
                <Card.Title>Orders Management</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Orders</Card.Subtitle>
                <Card.Text>
                  Manage incoming orders.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default DashboardPage;

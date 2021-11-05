import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = _ => {
  return (
    <div className="App" style={{ margin: "15px"}}>
      
      <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard_tiles">
        <div className="tile">
          <Link to="/stock">
            <Card className="dashboard_tile">
              <Card.Body>
                <Card.Title>Stock Management</Card.Title>
                <Card.Subtitle className="mb-4 text-muted">Stock</Card.Subtitle>
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
                <Card.Subtitle className="mb-4 text-muted">Orders</Card.Subtitle>
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
}

export default Dashboard;
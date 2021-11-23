import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = props => {
  const history = useHistory()

  return (
    <div className="App" style={{ margin: "15px" }}>

      {props.user && props.user.type === "admin" &&
        <div className="App">
          <div style={{ width: 'fit-content', margin: '0 auto', padding: '2.5em' }}>
            <h1>Dashboard</h1>
            <Button variant="danger" onClick={props.logout}>Logout</Button>
          </div>

          <div className="dashboard_tiles">
            <div className="tile">
              <Link to="/dashboard/stock">
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
              <Link to="/dashboard/orders">
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
      }

      {
        !props.user && history.push("/")
      }

    </div>
  )
}

export default Dashboard;
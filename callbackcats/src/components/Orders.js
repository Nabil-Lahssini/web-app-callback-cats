import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

import { getOrders, removeOrder } from "../services/service";

const Orders = props => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getOrders().then(response => setOrders(response.data));
  }, [])

  return (
    <div className="App" style={{ margin: "15px"}}>
        
      {props.user != null && props.user.type === "admin" &&
        <div>
          <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
            <h1>Orders Management</h1>
            <Link to="/dashboard">
              <Button variant="danger">Go Back</Button>
            </Link>
          </div>

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
              {orders.map(order => {
                return(
                  <tr key={order._id}>
                    <td>{orders.indexOf(order) + 1}</td>
                    <td>{order.order.map(o => {
                      return(
                        o.product.name
                      )
                    })}</td>
                    <td>{order.userId}</td>
                    <td>
                      <Button variant="success" onClick={() => removeOrder(order)}>Process</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      }

      {props.user === null &&
        history.push("/")
      }
    </div>
  );
}

export default Orders;
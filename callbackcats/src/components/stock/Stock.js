import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import { getProducts } from "../../services/service";

const Stock = props => {
    const [products, setProducts] = useState([]);

    const history = useHistory()

    useEffect(() => {
      getProducts().then(response => setProducts(response.data));
    }, [])

    return (
        <div className="App">
            
          {props.user != null && props.user.type === "admin" &&
            <div>
              <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Stock</h1>
              </div>

              <Table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    return (
                      <tr key={product._id}>
                        <td>{products.indexOf(product) + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
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

export default Stock;
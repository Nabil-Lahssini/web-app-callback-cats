import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";

const Stock = props => {
    const [records, setRecords] = useState([]);

    const history = useHistory()

    const handleDeleteRecord = id => {
        // axios.delete("http://localhost:5000/" + id)
        //     .then((response) => {
        //         console.log(response.data);
        //     });

        setRecords(records.filter((el) => el._id !== id));
    }

    // useEffect(
    //     axios.get("http://localhost:5000/record/")
    //         .then((response) => {
    //             setRecords(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // )

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
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => {
                    return (
                      <tr>
                        <td>{record.name}</td>
                        <td>{record.quantity}</td>
                        <td>
                          <Link to={"/edit/" + record._id}>Edit</Link> |
                          <a href="/" onClick={() => { handleDeleteRecord(record._id)}}>Delete</a>
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

export default Stock;
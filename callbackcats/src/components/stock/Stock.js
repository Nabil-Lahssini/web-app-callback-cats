import React, { useEffect, useState } from "react";
// This will require to npm install axios
// import axios from 'axios';

import { Link } from "react-router-dom";

const Stock = _ => {
    const [records, setRecords] = useState(null);

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
          <table className="table table-striped" style={{ marginTop: 20 }}>
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
          </table>
        </div>
      );
}

export default Stock;
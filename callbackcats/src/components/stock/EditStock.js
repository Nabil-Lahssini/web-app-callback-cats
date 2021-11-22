import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form, Button} from "react-bootstrap";
// This will require to npm install axios
// import axios from 'axios';

import { Link } from "react-router-dom";

const EditStock = props => {
    const [form, setForm] = useState(null);

    const history = useHistory()

    const handleFormChange = event => {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        // When post request is sent to the create url, axios will add a new record(newperson) to the database.
        // const newstock = {
        //     name: form.name,
        //     quantity: form.quantity,
        // };
    
        // axios
        //     .post("http://localhost:5000/record/add", form)
        //     .then((res) => console.log(res.data));
    
        // We will empty the state after posting the data to the database
        setForm(null);
    }

    // useEffect(
    //     axios
    //         .get("http://localhost:5000/record/" + props.match.params.id)
    //         .then((response) => {
    //             this.setState({
    //                 name: response.data.name,
    //                 quantity: response.data.quantity,
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // , [props.match.params.id])

    return (
        <div className="App">
            
          {props.user != null && props.user.type === "admin" &&
            <div>
                <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                    <h1>Update Stock Record</h1>
                    <Link to="/dashboard/stock">
                        <button type="button" className="btn btn-danger">Go Back</button>
                    </Link>
                </div>

                <Form onSubmit={handleSubmit} style={{width:"50%", margin:"0 auto"}}>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
                        <Form.Control type="text" className="form-control" name="name" id="name" onChange={handleFormChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="quantity" className="form-label">Quantity</Form.Label>
                        <Form.Control type="text" className="form-control" name="quantity" id="quantity" onChange={handleFormChange} required ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update Record</Button>
                </Form>
            </div>
          }

          {props.user === null &&
            history.push("/")
          }
        </div>
      );
}

export default EditStock;
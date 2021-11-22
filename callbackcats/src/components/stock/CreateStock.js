import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
// This will require to npm install axios
// import axios from 'axios';

import { Link } from "react-router-dom";

const CreateStock = props => {
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

    return (
        <div className="App">
            
          {props.user != null && props.user.type === "admin" &&
            <div>
                <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                    <h1>Create New Stock Record</h1>
                    <Link to="/dashboard/stock">
                        <button type="button" className="btn btn-danger">Go Back</button>
                    </Link>
                </div>

                <Form onSubmit={handleSubmit} style={{width:"50%", margin:"0 auto"}}>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" onChange={handleFormChange} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="quantity" className="form-label">Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" id="quantity" onChange={handleFormChange} required></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Create stock</Button>
                </Form>
            </div>
          }

          {props.user == null &&
            history.push("/")
          }

        </div>
      );
}

export default CreateStock;
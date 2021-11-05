import React, { useState } from "react";
// This will require to npm install axios
// import axios from 'axios';

import { Link } from "react-router-dom";

const CreateStock = _ => {
    const [form, setForm] = useState(null);

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

            <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Create New Stock Record</h1>
                <Link to="/stock">
                    <button type="button" className="btn btn-danger">Go Back</button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} style={{width:"50%", margin:"0 auto"}}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={handleFormChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="text" className="form-control" name="quantity" id="quantity" onChange={handleFormChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Create stock</button>
            </form>
        </div>
      );
}

export default CreateStock;
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { addProduct } from "../../services/service";

const CreateStock = props => {
    const [product, setProduct] = useState({
        name: null,
        stock: null,
        ingredients: [],
        allergies: [],
        price: null
    });

    const history = useHistory()

    const handleChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        addProduct(product);
        history.go(0);
    }

    return (
        <div className="App">

            {props.user && props.user.type === "admin" &&
                <div className="App">
                    <div style={{ width: 'fit-content', margin: '0 auto', padding: '2.5em' }}>
                        <h1>Create Product</h1>
                        <Link to="/dashboard/stock">
                            <button type="button" className="btn btn-danger">Go Back</button>
                        </Link>
                    </div>

                    <Form onSubmit={handleSubmit} style={{ width: "50%", margin: "0 auto" }}>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
                            <Form.Control type="text" name="name" id="name" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="stock" className="form-label">Stock</Form.Label>
                            <Form.Control type="number" name="stock" id="stock" onChange={handleChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="ingredients" className="form-label">Ingredients</Form.Label>
                            <Form.Control type="text" className="form-control" name="ingredients" id="ingredients" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="allergies" className="form-label">Allergies</Form.Label>
                            <Form.Control type="text" className="form-control" name="allergies" id="allergies" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="price" className="form-label">Price (in cents)</Form.Label>
                            <Form.Control type="number" className="form-control" name="price" id="price" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">Create</Button>
                    </Form>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );
}

export default CreateStock;
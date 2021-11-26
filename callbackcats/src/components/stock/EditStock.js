import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { getProduct, updateStock } from "../../services/service";

const EditStock = props => {
    const [stock, setStock] = useState({
        _id: null,
        name: null,
        stock: null,
        ingredients: [],
        allergies: [],
        price: null
    });

    const history = useHistory()

    const handleChange = event => {
        const { name, value } = event.target;
        setStock({ ...stock, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        updateStock(stock);
        history.go(0)
    }

    useEffect(() => {
        getProduct(props.match.params.id).then(response => setStock(response.data));
    } , [props.match.params.id])

    return (
        <div className="App">

            {props.user && props.user.type === "admin" && stock &&
                <div className="App">
                    <div style={{ width: 'fit-content', margin: '0 auto', padding: '2.5em' }}>
                        <h1>Update Product</h1>
                        <Link to="/dashboard/stock">
                            <button type="button" className="btn btn-danger">Go Back</button>
                        </Link>
                    </div>

                    <Form onSubmit={handleSubmit} style={{ width: "50%", margin: "0 auto" }}>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={stock.name} name="name" id="name" onChange={handleChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="stock" className="form-label">Stock</Form.Label>
                            <Form.Control type="number" className="form-control" defaultValue={stock.stock} name="stock" id="stock" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="ingredients" className="form-label">Ingredients</Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={stock.ingredients} name="ingredients" id="ingredients" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="allergies" className="form-label">Allergies</Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={stock.allergies} name="allergies" id="allergies" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="price" className="form-label">Price (in cents)</Form.Label>
                            <Form.Control type="number" className="form-control" defaultValue={stock.price} name="price" id="price" onChange={handleChange} required ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">Update</Button>
                    </Form>
                </div>
            }

            {
                !props.user && history.push("/")
            }
        </div>
    );
}

export default EditStock;
import { useState } from "react";

import { Button, Form, Card, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

const CreateSandwich = props => {
    let main = ['Salami', 'Ham', 'Salmon', 'Tuna', 'None'];

    let bread = ['White', 'Brown'];

    let condiments = ['Ketchup', 'Mayonaise', 'Mustard'];

    let veggies = ['Cucumbers', 'Lettuce', 'Red onions', 'Tomatoes'];

    let cheese = ['Cheddar', 'Mozarella', 'Gouda'];

    const history = useHistory()

    {/* For Modal */ }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    {/* --------- */ }


    return (
        <div style={{ margin: "15px" }}>
            <Button variant="primary" onClick={handleShow} style={{ padding: "25px" }}>
                Start making your own sandwich
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose your ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="form-sandwich">
                        <h4> Main </h4>
                        {main.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check
                                    type='radio'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}
                        <br></br>
                        <h4> Type of bread </h4>
                        {bread.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check
                                    type='radio'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}

                        <br></br>
                        <h4> Veggies </h4>
                        {veggies.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check
                                    type='checkbox'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}

                        <br></br>
                        <h4> Cheese </h4>
                        {cheese.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check
                                    type='checkbox'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}

                        <br></br>
                        <h4> Sauces </h4>
                        {condiments.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check
                                    type='checkbox'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose} type="submit" form="form-sandwich" href="/cart">
                        Add to cart
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Card className="mx-auto" style={{ width: '35rem' }}>
                <Card.Body>
                    <Card.Title>Make your own sandwich</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Choose which ingredients you would like to add to your sandwich!</Card.Subtitle>
                    <Form>
                        {options.map((type) => (
                            <div key={`${type}`}>
                                <Form.Check 
                                <Form.Check
                                    type='checkbox'
                                    id={`${type}`}
                                    label={`${type}`}
                                />
                            </div>
                        ))}
                    
                        <br></br>
                        <Button variant="outline-dark" href="/cart" className="mt-2">
                            Create &amp; Add to cart
                        </Button>
                    </Form>
                </div>
            </div>
                </Card.Body>
            </Card> */}
        </div>
    )
}

export default CreateSandwich
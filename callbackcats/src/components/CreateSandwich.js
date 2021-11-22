import { useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

const CreateSandwich = props => {
    let main = ['Salami', 'Ham', 'Salmon', 'Tuna', 'None'];

    let bread = ['White', 'Brown'];

    let condiments = ['Ketchup', 'Mayonaise', 'Mustard'];

    let veggies = ['Cucumbers', 'Lettuce', 'Red onions', 'Tomatoes'];

    let cheese = ['Cheddar', 'Mozarella', 'Gouda'];

    const history = useHistory()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="App">
            {props.user != null && props.user.type === "normal" &&
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
                </div>
            }

            {props.user === null &&
                history.push("/")
            }
            
        </div>
    )
}

export default CreateSandwich;
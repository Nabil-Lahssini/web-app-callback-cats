import { Button, Form, Card, Modal } from "react-bootstrap";

import { useState } from "react";


const CreateSandwich = _ => {
    let options = ['Cheese', 'Salami', 'Ham', 'Tuna'];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{ margin: "15px" }}>
            <Button variant="primary" onClick={handleShow} style={{ padding: "25px"}}>
                Start making your own sandwich
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose your ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="form-sandwich">
                        {options.map((type) => (
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
                </Card.Body>
            </Card> */}
        </div>
    )
}

export default CreateSandwich
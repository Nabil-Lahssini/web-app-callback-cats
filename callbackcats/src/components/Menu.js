import { useEffect, useState } from "react";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { getMenus } from "../services/service";

const Menu = props => {
    const [menu, setMenu] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getMenus().then(response => setMenu(response.data));
    }, []);

    return (
        <div className="App">

            {props.user &&
                <div className="App">
                    <div style={{ width: 'fit-content', margin: '0 auto', padding: '2.5em' }}>
                        <h1>Menu</h1>
                    </div>

                    <div className="container">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Maandag</Accordion.Header>

                                <Accordion.Body>
                                    <Row xs={1} md={4} className="g-4">
                                        {menu.map(day => {
                                            return (
                                                day.monday.map(product => {
                                                    return (
                                                        <Col key={product._id}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Body onClick={() => history.push(`/product/${product._id}`)} style={{ cursor: "pointer" }}>
                                                                    <Card.Title>{product.name}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Price: &euro;{product.price / 100}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Allergies: {product.allergies}</Card.Subtitle>
                                                                </Card.Body>

                                                                <Button variant="primary" className="rounded-0 rounded-bottom" onClick={() => props.addToCart(product, 1)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                    </svg>
                                                                    Add to cart
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            )
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Dinsdag</Accordion.Header>

                                <Accordion.Body>
                                    <Row xs={1} md={4} className="g-4">
                                        {menu.map(day => {
                                            return (
                                                day.tuesday.map(product => {
                                                    return (
                                                        <Col key={product._id}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Body>
                                                                    <Card.Title onClick={() => history.push(`/product/${product._id}`)} style={{ cursor: "pointer" }}>{product.name}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Price: &euro;{product.price / 100}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Allergies: {product.allergies}</Card.Subtitle>
                                                                </Card.Body>

                                                                <Button variant="primary" className="rounded-0 rounded-bottom" onClick={() => props.addToCart(product, 1)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                    </svg>
                                                                    Add to cart
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            )
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Woensdag</Accordion.Header>

                                <Accordion.Body>
                                    <Row xs={1} md={4} className="g-4">
                                        {menu.map(day => {
                                            return (
                                                day.wednesday.map(product => {
                                                    return (
                                                        <Col key={product._id}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Body>
                                                                    <Card.Title onClick={() => history.push(`/product/${product._id}`)} style={{ cursor: "pointer" }}>{product.name}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Price: &euro;{product.price / 100}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Allergies: {product.allergies}</Card.Subtitle>
                                                                </Card.Body>

                                                                <Button variant="primary" className="rounded-0 rounded-bottom" onClick={() => props.addToCart(product, 1)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                    </svg>
                                                                    Add to cart
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            )
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Donderdag</Accordion.Header>

                                <Accordion.Body>
                                    <Row xs={1} md={4} className="g-4">
                                        {menu.map(day => {
                                            return (
                                                day.thursday.map(product => {
                                                    return (
                                                        <Col key={product._id}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Body>
                                                                    <Card.Title onClick={() => history.push(`/product/${product._id}`)} style={{ cursor: "pointer" }}>{product.name}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Price: &euro;{product.price / 100}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Allergies: {product.allergies}</Card.Subtitle>
                                                                </Card.Body>

                                                                <Button variant="primary" className="rounded-0 rounded-bottom" onClick={() => props.addToCart(product, 1)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                    </svg>
                                                                    Add to cart
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            )
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Vrijdag</Accordion.Header>

                                <Accordion.Body>
                                    <Row xs={1} md={4} className="g-4">
                                        {menu.map(day => {
                                            return (
                                                day.friday.map(product => {
                                                    return (
                                                        <Col key={product._id}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Body>
                                                                    <Card.Title onClick={() => history.push(`/product/${product._id}`)} style={{ cursor: "pointer" }}>{product.name}</Card.Title>
                                                                    <Card.Subtitle className="mb-2 text-muted">Price: &euro;{product.price / 100}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Allergies: {product.allergies}</Card.Subtitle>
                                                                </Card.Body>

                                                                <Button variant="primary" className="rounded-0 rounded-bottom" onClick={() => props.addToCart(product, 1)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                    </svg>
                                                                    Add to cart
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            )
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );

}

export default Menu;
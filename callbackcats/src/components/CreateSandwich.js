import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toppings } from "./utils/toppings";



const CreateSandwich = props => {

    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
    );

    
    
    const [total, setTotal] = useState(0);
    
    
    const handleOnChange = (position) => {
        const ingredients=[];
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
            if (currentState === true) {
                return sum + toppings[index].price;
            }
            return sum;
            },
            0
        );
        setTotal(totalPrice);

        const totalIngredients = updatedCheckedState.reduce(
            (ingredients_, currentState, index) => {
            if (currentState === true) {
                ingredients.push(toppings[index].name)
                return ingredients_ + toppings[index].name+" ";
            }
            return ingredients_;
            },
            ""
        );
        
        
        console.log(ingredients);
        setProduct({...product,[ingredients]:ingredients})
        console.log(total);
    };
    
    const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

    const history = useHistory()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProduct] = useState({
        _id: 1,
        name: "Sandwich",
        stock: null,
        ingredients: [],
        allergies: [],
        price: total
    });

    return (
        <div className="App">

            {props.user && props.user.type === "normal" &&
                <div className="App" style={{ margin: "15px" }}>
                    <Button variant="primary" onClick={handleShow} style={{ padding: "25px" }}>
                        Start making your own sandwich
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Choose your ingredients</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id="form-sandwich">
                                <ul className="toppings-list">
                                    {toppings.map(({ name, price }, index) => {
                                    return (
                                        <li key={index}>
                                        <div className="toppings-list-item">
                                            <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={name}
                                                value={name}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                            </div>
                                            <div className="right-section">{getFormattedPrice(price)}</div>
                                        </div>
                                        </li>
                                    );
                                    })}
                                    <li>
                                    <div className="toppings-list-item">
                                        <div className="left-section">Total:</div>
                                        <div className="right-section">{getFormattedPrice(total)}</div>
                                    </div>
                                    </li>
                                </ul>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => props.addToCart(product, 1)} type="submit" form="form-sandwich" href="/cart">
                                Add to cart
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    )
}

export default CreateSandwich;
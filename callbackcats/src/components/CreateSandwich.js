import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  getToppings,
  getBreads,
  getVegetables,
  getSauces,
} from "../services/service";

const CreateSandwich = (props) => {
  const [product, setProduct] = useState({
    name: "Sandwich",
    ingredients: [],
    allergies: [],
    price: 0,
  });

  const [toppings, setToppings] = useState([]);
  const [breads, setBreads] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [sauces, setSauces] = useState([]);

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getToppings().then((response) => {
      const array = [];
      response.data.forEach((topping) => {
        array.push({
          label: topping.name,
          value: topping.name,
        });
        setToppings(array);
      });
    });
    getBreads().then((response) => {
      console.log();
      const array = [];
      response.data.forEach((bread) => {
        array.push({
          label: bread.name,
          value: bread.name,
        });
        setBreads(array);
      });
    });
    getVegetables().then((response) => {
      const array = [];
      response.data.forEach((vegetable) => {
        array.push({
          label: vegetable.name,
          value: vegetable.name,
        });
        setVegetables(array);
      });
    });
    getSauces().then((response) => {
      const array = [];
      response.data.forEach((sauce) => {
        array.push({
          label: sauce.name,
          value: sauce.name,
        });
        setSauces(array);
      });
    });
  }, []);

  const handleChange = (event) => {
    const p = product
      if (event.id === "white-bread") {
          p.ingredients.push("White bread")
      } else p.ingredients.push("Brown bread")
  };

  return (
    <div className="App">
      {props.user && props.user.type === "normal" && (
        <div className="App" style={{ margin: "15px" }}>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ padding: "25px" }}
          >
            Start making your own sandwich
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose your ingredients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="form-sandwich">
                <div key="radio" className="mb-3">
                  <Form.Check
                    label="White bread"
                    name="bread"
                    type="radio"
                    id="white-bread"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="Brown bread"
                    name="bread"
                    type="radio"
                    id="brown-bread"
                    onChange={handleChange}
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                form="form-sandwich"
                href="/cart"
              >
                Add to cart
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}

      {!props.user && history.push("/")}
    </div>
  );
};

export default CreateSandwich;

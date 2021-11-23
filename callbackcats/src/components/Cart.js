import { useHistory } from "react-router-dom";

import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = props => {
    const history = useHistory();

    return (
        <div className="App">

            {props.user && props.user.type === "normal" &&
                <div className="App">
                    <div style={{ width: 'fit-content', margin: '0 auto', padding: '2.5em' }}>
                        <h1>Cart</h1>
                    </div>

                    <div className="mx-auto" style={{ width: "50%" }}>
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cart.map(item => {
                                    return (
                                        <tr key={item.product._id}>
                                            <th>{props.cart.indexOf(item) + 1}</th>
                                            <td onClick={() => history.push(`/product/${item.product._id}`)} style={{ cursor: "pointer" }}>{item.product.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.product.price / 100}</td>
                                            <td><Button variant="danger" onClick={() => props.removeFromCart(item.product)}>Remove</Button></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </Table>

                        <Link to={"/checkout"} className="btn btn-success">Checkout</Link>
                    </div>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );

}

export default Cart;
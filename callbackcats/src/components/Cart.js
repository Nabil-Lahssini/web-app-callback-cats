import { useHistory } from "react-router";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = props => {
    const history = useHistory();

    return (
        <div className="App">
            
            {props.user != null && props.user.type === "normal" &&
                <div>
                    <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                        <h1>Cart</h1>
                    </div>

                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cart.map(item => {
                                    return(
                                        <tr key={item.product._id}>
                                            <th scope="row">{props.cart.indexOf(item) + 1}</th>
                                            <td>{item.product.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.product.price/100}</td>
                                            <td><Button variant="danger" onClick={() => props.removeFromCart(item.product)}>Remove</Button></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>

                        <Link to={"/checkout"} className="btn btn-success">Checkout</Link>
                    </div>
                </div>
            }

            {props.user === null &&
                history.push("/")
            }
            
        </div>
    );

}

export default Cart;
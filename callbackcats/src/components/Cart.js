import { Button, Table } from "react-bootstrap";


const Cart = props => {

    return (
        <div className="App">
            
            <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Cart</h1>
            </div>

            <div className="mx-auto" style={{ width: "50%"}}>
                <Table class="table">
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
                            return(
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td><Button onClick={_ => props.removeFromCart(item.id)}>Remove</Button></td>
                                </tr>
                            )
                        })
                        }

                        <tr>
                            <th>1</th>
                            <td>Lasagne</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 5.00</td>
                            <td><Button variant="danger">Remove</Button></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hamburger</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 4.00</td>
                            <td><Button variant="danger">Remove</Button></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Broodje</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 2.50</td>
                            <td><Button variant="danger">Remove</Button></td>
                        </tr>
                    </tbody>
                </Table>

                <Button variant="primary">Pay</Button>
            </div>
            
        </div>
    );

}

export default Cart;
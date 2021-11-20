const Cart = props => {

    return (
        <div className="App">
            
            <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Cart</h1>
            </div>

            <div className="container">
                <table class="table">
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
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td><button style={{border: "none", backgroundColor: "white"}} onClick={_ => props.removeFromCart(item.id)}>Remove</button></td>
                                </tr>
                            )
                        })
                        }

                        <tr>
                            <th scope="row">1</th>
                            <td>Lasagne</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 5.00</td>
                            <td><button style={{border: "none", backgroundColor: "white"}}>Remove</button></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Hamburger</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 4.00</td>
                            <td><button style={{border: "none", backgroundColor: "white"}}>Remove</button></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Broodje</td>
                            <td><input type="number" className="form-control" defaultValue="1" /></td>
                            <td>&euro; 2.50</td>
                            <td><button style={{border: "none", backgroundColor: "white"}}>Remove</button></td>
                        </tr>
                    </tbody>
                </table>

                <button className="btn btn-success">Pay</button>
            </div>
            
        </div>
    );

}

export default Cart;
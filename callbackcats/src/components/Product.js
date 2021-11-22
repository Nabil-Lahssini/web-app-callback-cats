import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getProduct } from "../services/service";

import { Button } from "react-bootstrap"

const Product = props => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(product ? props.cart.find(item => item.product._id === product._id) ? props.cart.find(item => item.product._id === product._id).quantity : 1 : 1);
    const history = useHistory();    

    const fetchProduct = async productId => {
      await getProduct(productId)
        .then(response => setProduct(response.data));
    }
  
    useEffect(() => {
      fetchProduct(props.match.params.id);
    }, [props.match.params.id]);

    console.log(product)

    return (
        <div className="App">
            
            {props.user != null && product &&
                <div>
                    <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                        <h1>Product</h1>
                        <input type="number" className="form-control" onChange={(event) => setQuantity(event.target.value)} defaultValue={quantity} min="1" required />
                        {
                        props.cart.find(item => item.product._id === product._id)
                        ?
                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                            <Button variant="danger" onClick={() => props.removeFromCart(product)}>Remove from cart</Button>
                            <Button variant="warning" onClick={() => props.updateCart(product, parseInt(quantity))}>Update cart</Button>
                        </div>
                        :
                        <Button variant="primary" onClick={() => props.addToCart(product, parseInt(quantity))}>Add to cart</Button>
                        }
                    </div>

                    <div className="container">
                        <div>
                            <label>Price: &euro;{product.price/100}</label>
                        </div>

                        <hr/>

                        <div>
                            <label>Ingredients:</label>
                            <ul style={{listStyleType:"none"}}>
                                {product.ingredients.map(ingredient => {
                                    return(
                                        <li key={ingredient}>{ingredient}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <hr/>

                        <div>
                            <label>Allergies:</label>
                            <ul style={{listStyleType:"none"}}>
                                {product.allergies.map(allergie => {
                                    return(
                                        <li key={allergie}>{allergie}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }

            {props.user === null &&
                history.push("/")
            }
            
        </div>
    );

}

export default Product;
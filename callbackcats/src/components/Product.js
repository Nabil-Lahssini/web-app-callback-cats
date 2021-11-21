import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getProduct } from "../services/service";

const Product = props => {
    const [product, setProduct] = useState(null);

    const history = useHistory();

    const fetchProduct = async productId => {
      await getProduct(productId.toString())
        .then(response => setProduct(response.data));
    }
  
    useEffect(() => {
      fetchProduct(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div className="App">
            
            {props.user != null &&
                <div>
                    <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                        <h1>Product</h1>
                    </div>

                    <div className="container">
                        <div>
                            <label>Price: &euro;{product.price}</label>
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
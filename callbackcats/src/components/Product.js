import { useState } from "react";

const Product = props => {
    const [product, setProduct] = useState(null);

    return (
        <div className="App">
            
            <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Product</h1>
            </div>

            <div className="container">
            
            </div>
            
        </div>
    );

}

export default Product;
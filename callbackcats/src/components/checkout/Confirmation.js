const Confirmation = _ => {
    return (
        <div className="App">
    
            <div style={{width:'fit-content', margin:'0 auto', padding:'1.5em'}}>
                <h1>Checkout - Confirmation</h1>
            </div>
            
            <div style={{width:'fit-content', margin:'0 auto'}}>
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`} style={{textDecoration:'none'}}>Stripe dashboard.</a>
                Refresh the page to pay again.
            </div>
    
        </div>
      );
}

export default Confirmation;
import { useHistory } from "react-router-dom";

const Confirmation = props => {
    const history = useHistory();

    return (
        <div className="App">

            {props.user &&
                <div className="App">
                    <div style={{ width: 'fit-content', margin: '0 auto', padding: '1.5em' }}>
                        <h1>Checkout - Confirmation</h1>
                    </div>

                    <div style={{ width: 'fit-content', margin: '0 auto' }}>
                        Payment succeeded, see the result in your
                        <a href={`https://dashboard.stripe.com/test/payments`} style={{ textDecoration: 'none' }}>Stripe dashboard.</a>
                        Refresh the page to pay again.
                    </div>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );
}

export default Confirmation;
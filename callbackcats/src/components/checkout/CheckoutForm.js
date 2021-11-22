import {
    useState
} from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { 
    createPaymentIntent
} from "../../services/service";

const CheckoutForm = props => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        email: "",
    });
    const stripe = useStripe();
    const elements = useElements();

    const handleChange = async event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const options = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "black",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": {
                    color: "black"
                },
                "::placeholder": {
                    color: "black",
                }
            },
            invalid: {
                iconColor: "red",
                color: "red"
            }
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);
        setSucceeded(false);
        setError(null);

        if (!stripe || !elements) return;
        else {
            createPaymentIntent(props.cart)
            .then(async response => {
                const payload = await stripe.confirmCardPayment(response.data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                });

                if (payload.error) {
                    setError(`Payment failed ${payload.error.message}`);
                    setProcessing(false);
                } else {
                    
                        setError(null);
                        setProcessing(false);
                        setSucceeded(true);

                        props.emptyCart();
                        props.setStep(props.step + 1);
                }
            });
        }
    }
    
    return (
        <div className="App">

            <div style={{width:"fit-content", margin:"0 auto", padding:"1.5em"}}>
                <h1>Checkout - Pay</h1>
            </div>

            <div className="container" style={{margin:"5em auto"}}>
                <div className="container" style={{margin:"5em auto"}}>
                    <form onSubmit={handleSubmit} style={{margin:"0 auto", width:"50%"}}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Voornaam + achternaam<span style={{color:"red"}}>*</span></label>
                            <input type="text" className="form-control" name="name" defaultValue={"student student"} onChange={(event) => setBillingDetails({...billingDetails, [event.target.name]: event.target.value})} required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail adres<span style={{color:"red"}}>*</span></label>
                            <input type="email" className="form-control" name="email" defaultValue={"student@student.ehb.be"} onChange={(event) => setBillingDetails({...billingDetails, [event.target.name]: event.target.value})} required></input>
                        </div>
                        <div className="mb-3">
                            <CardElement options={options} onChange={handleChange} />
                        </div>
                        {processing ? (
                            <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"5em"}}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div style={{display:"flex", justifyContent:"space-evenly", margin:"5em 0"}}>
                                <button className="btn btn-danger" onClick={() => props.setStep(props.step - 1)}>Terug</button>
                                <button className="btn btn-success" disabled={error || processing || disabled || succeeded}>
                                    <span>Pay</span>
                                </button>
                            </div>
                        )}
                        {error && (
                            <div style={{color:"red"}}>
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;
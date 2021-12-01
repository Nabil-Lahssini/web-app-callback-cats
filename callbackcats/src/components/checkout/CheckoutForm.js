import {
    useState
} from "react";

import {
    Form,
    Button,
    Spinner,
    Alert
} from "react-bootstrap";

import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {
    createPaymentIntent,
    addOrder
} from "../../services/service";
import { useHistory } from "react-router-dom";

const CheckoutForm = props => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const handleChange = async event => {
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
                fontSize: "20px",
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
                        addOrder(props.user._id, props.cart);

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
        <div>

            {props.user &&
                <div>
                    <div style={{ margin: "0 auto", padding: "1.5em" }}>
                        <h1>Checkout - Pay</h1>
                    </div>

                    <div className="checkoutForm">
                        <Form onSubmit={handleSubmit}>

                            <div>
                                <CardElement options={options} onChange={handleChange} />
                            </div>

                            {processing ? (
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "5em" }}>
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "2em" }}>
                                    <Button variant="danger" onClick={() => props.setStep(props.step - 1)}>Cancel</Button>
                                    <Button type="submit" variant="success" disabled={error || processing || disabled || succeeded}>
                                        <span>Pay</span>
                                    </Button>
                                </div>
                            )}
                            {error && (
                                <div>
                                    <Alert variant="danger">
                                        {error}
                                    </Alert>
                                </div>
                            )}

                        </Form>
                    </div>
                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );
}

export default CheckoutForm;
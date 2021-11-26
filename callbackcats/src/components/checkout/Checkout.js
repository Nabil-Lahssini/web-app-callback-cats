import { useState } from "react";
import {
  Elements
} from "@stripe/react-stripe-js";
import {
  loadStripe
} from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import Confirmation from "./Confirmation";

const Checkout = props => {
  const [step, setStep] = useState(0);
  const [stripePromise] = useState(() => loadStripe("pk_test_51JyK2rLfaOxbuUDdAQyLHP0Yz5sT9PIKhSNOWnx9MMqNNfOrMfYUlOTcoxKnhWiOgRBFYCEwAyQcpBcoo8u9Si7i00DZabqGN2"))

  const history = useHistory();

  const Form = _ =>
    step === 0
      ? <CheckoutForm {...props} cart={props.cart} user={props.user} step={step} setStep={setStep} />
      : <Confirmation {...props} cart={props.cart} emptyCart={props.emptyCart} />

  return (
    <div className="App">

      {
        props.user &&
        <Elements stripe={stripePromise}>
          <Form />
        </Elements>
      }

      {
        !props.user && history.push("/")
      }

    </div>
  );
}

export default Checkout;
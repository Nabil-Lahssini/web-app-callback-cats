import { useHistory } from "react-router-dom";

const Confirmation = props => {
    const history = useHistory();

    return (
        <div className="App">

            {props.user &&
                <div className="App">
                    <div style={{ margin: '0 auto', padding: '1.5em' }}>
                    </div>

                    <div className="centered" style={{ width: '625px', height: "500px",margin: '0 auto' }}>
                        <div style={{ float: "left" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                        </div>

                        <div style={{ float: "right", margin: "10px" }}>
                            <h3>Thank you for your order!</h3>
                            <p>Payment succeeded, your order will be processed immediately after receipt.</p>
                            <a href={`/menu`} style={{ textDecoration: 'none' }}>Go back to the menu.</a>
                        </div>
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
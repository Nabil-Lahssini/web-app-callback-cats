import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { login } from "../services/service";
import { useState } from "react";

const Login = props => {
    const [form, setForm] = useState({
        email: null,
        password: null
    });
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        login(form).then(response => {
            if (response.data === "Invalid Credentials") {
                setError("Invalid Credentials")
            } else {
                props.login(response.data)
                history.push("/menu")
            }
        })
    }

    return (
        <div className="App">

            {!props.user &&
                <div className="App">
                    <div className="login">
                        <div className="login-content">
                            <h3>Log in</h3>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <FloatingLabel controlId="floatingInput" label="Email">
                                        <Form.Control className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group style={{ color: "red" }}>
                                    {error}
                                </Form.Group>

                                <Button className="login-button" type="submit" variant="primary">
                                    Log in
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            }

            {
                props.user && history.push("/menu")
            }
        </div>
    )
}

export default Login;
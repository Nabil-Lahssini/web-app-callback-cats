import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { login } from "../services/service";
import { useState } from "react";

const Login = props => {
    const [error, setError] = useState(null);
    const history = useHistory();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        login(data).then(response => {
            if (response.data === "Invalid Credentials") {
                setError("Invalid Credentials")
            } else {
                props.login(response.data)
                history.push("/")
            }
        })
    }
    return(
        <div>
          {props.user === null &&
            <div>
                <div className="login">
                    <div className="login-content">
                        <h3>Log in</h3>
                        
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="formBasicEmail">
                                <FloatingLabel controlId="floatingInput" label="Email">
                                    <Form.Control className="form-control" type="email" placeholder="Email" {...register("email")} required />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control className="form-control" type="password" placeholder="Password" {...register("password")} required />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group style={{color:"red"}}>
                                {error}
                            </Form.Group>

                            <div>
                                <Button className="login-button" type="submit" variant="primary">
                                    Log in
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
          }

          {props.user != null &&
            history.push("/")
          }
        </div>
    )
}

export default Login;
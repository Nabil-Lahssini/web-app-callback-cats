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
            if (response.data === null) {
                setError("Wrong combination.")
            } else {
                props.login(response.data)
                history.push("/")
            }
        })
    }
    return(
        <div className="App" style={{ margin: "15px"}}>
            
          {props.user === null &&
            <div>
                <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                    <h1>Login</h1>
                </div>

                <div className="d-flex align-items-center login">
                    <div className="login-container bg-light p-4 rounded border">
                        <h1 className="display-1 mb-4">Log in</h1>
                        
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                                    <Form.Control type="text" placeholder="Username" {...register("username")} required />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-1">
                                    <Form.Control type="password" placeholder="Password" {...register("password")} required />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{color:"red"}}>
                                {error}
                            </Form.Group>

                            <div className="d-grid mt-4 gap-1">
                                <Button type="submit" variant="primary" className="py-2">
                                    Login
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
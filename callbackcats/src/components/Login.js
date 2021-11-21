import { Button, FloatingLabel, Form } from "react-bootstrap"

const Login = _ => {
    return(
        <div className="App" style={{ margin: "15px"}}>
      
            <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Login</h1>
            </div>

            <div className="d-flex align-items-center login">
                <div className="login-container bg-light p-4 rounded border">
                    <h1 className="display-1 mb-4">Log in</h1>
                    
                    <Form method="post">
                        {/* Email */}
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        {/* Password */}
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-1">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>

                        {/* Remember me */}
                        <Form.Check inline label="Remember me" type="checkbox" id="rememberMe" />

                        <div className="d-grid mt-4 gap-1">
                            {/* Submit */}
                            <Button type="submit" variant="primary" className="py-2">
                                Login
                            </Button>
                            
                            {/* Register */}
                            {/* >> To different page or different post route */}
                            <Button variant="outline-dark" href="register">
                                Sign up
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;
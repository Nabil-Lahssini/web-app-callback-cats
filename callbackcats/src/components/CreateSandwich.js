import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const CreateSandwich = props => {
    let options = ['Cheese', 'Salami', 'Ham'];

    const history = useHistory()

    return(
        <div className="App" style={{ margin: "15px"}}>
            
          {props.user != null && props.user.type === "normal" &&
            <div>
                <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                    <h1>CreateSandwich</h1>
                </div>

                <div className="d-flex align-items-center login">
                    <div className="container w-50 bg-light p-4 rounded border">
                        <h1 className="display-3">Create sandwich</h1>
                        <p className="lead mb-4">Choose which ingredients you would like to add to your sandwich!</p>

                        <Form>
                            {options.map((type) => (
                                <div key={`${type}`}>
                                    <Form.Check 
                                        type='checkbox'
                                        id={`${type}`}
                                        label={`${type}`}
                                    />
                                </div>
                            ))}

                            {/* Submit */}
                            <Button variant="outline-dark" href="/cart" className="mt-2">
                                Create &amp; Add to cart
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
          }

          {props.user === null &&
            history.push("/")
          }
        </div>
    )  
}

export default CreateSandwich
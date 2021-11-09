import { Button, Form } from "react-bootstrap";

let options = ['Cheese', 'Salami', 'Ham']

const CreateSandwich = () => (
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
);

export default CreateSandwich
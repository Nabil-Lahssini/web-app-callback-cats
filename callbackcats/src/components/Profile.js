import { useHistory } from "react-router-dom";
import { Button, Tab, Tabs, Accordion } from "react-bootstrap";

const Profile = props => {
    const history = useHistory();

    return (
        <div className="App">

            {props.user && props.user.type === "normal" &&
                <div className="App">
                    <div style={{ margin: '0 auto', padding: '2.5em' }}>
                        <h1 style={{ float: 'left' }}>Profile</h1>
                        <Button style={{ float: 'right' }} variant="danger" onClick={props.logout}>Logout</Button>
                    </div>

                    <br></br>

                    <Tabs style={{ margin: '0 auto', padding: '2.5em' }} defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="orders" title="Orders">
                            <Accordion style={{ margin: '0 auto', padding: '2.5em' }} defaultActiveKey="0">
                                {props.user.orders.map(order => {
                                    return (
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Order #{props.user.orders.indexOf(order) + 1}</Accordion.Header>
                                            <Accordion.Body>
                                                Products: {order.product.name}
                                                <br />
                                                Quantity: {order.quantity}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </Tab>
                        <Tab eventKey="2-fact" title="2-Factor Authentication">
                            <h3>2-Factor Authentication</h3>
                        </Tab>
                    </Tabs>

                </div>
            }

            {
                !props.user && history.push("/")
            }

        </div>
    );

}

export default Profile;
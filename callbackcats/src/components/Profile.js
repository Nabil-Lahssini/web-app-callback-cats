import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

const Profile = props => {
    const history = useHistory();

    return (
        <div className="App">
            
            {props.user != null && props.user.type === "normal" &&
                <div>
                    <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                        <h1>Profile</h1>
                        <Button variant="danger" onClick={props.logout}>Logout</Button>
                    </div>

                    <div className="container">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="true">Orders</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="twofa-tab" data-bs-toggle="tab" data-bs-target="#twofa" type="button" role="tab" aria-controls="twofa" aria-selected="false">2-Factor Authentication</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab" style={{margin:"3em"}}>
                                <div class="accordion" id="accordionExample">
                                    {props.user && props.user.orders.map(order => {
                                        return(
                                            <div class="accordion-item" key={order.id}>
                                                <h2 class="accordion-header" id="headingOne">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        {order.id}
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <ul style={{listStyleType:"none"}}>
                                                            {order.items.map(item => {
                                                                return(
                                                                    <li key={item.name}>{item.name}</li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                # 0
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <ul style={{listStyleType:"none"}}>
                                                    <li>Lasagne</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="twofa" role="tabpanel" aria-labelledby="twofa-tab">2-Factor Authentication</div>
                        </div>
                    </div>
                </div>
            }

            {props.user === null &&
                history.push("/")
            }

        </div>
    );

}

export default Profile;
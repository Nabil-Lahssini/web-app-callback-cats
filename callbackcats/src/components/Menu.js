import { useState } from "react";
import { useHistory } from "react-router";
import { getMenus } from "../services/service";

const Menu = props => {
    const [menus, setMenus] = useState([]);

    const history = useHistory()

    const fetchMenus = _ => {
      getMenus().then(response => {
        console.log(response.data)
        // setMenus(response.data)
      })
    }

    fetchMenus()

    return (
        <div className="App">
            
          {props.user != null &&
            <div>
              <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                <h1>Menu</h1>
              </div>

              <div className="container">
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Menu Id</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Products</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <div>1</div>
                        </td>
                        <td>
                          <div>12/03/2021</div>
                        </td>
                        <td>
                          <div>17/03/2021</div>
                        </td>
                        <td>
                          <div>Spaghetti + drink</div>
                        </td>
                        <td>
                          <button type="button" className="btn btn-success">Show / Edit</button>
                          <button type="button" className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {props.user === null &&
            history.push("/login")
          }
            
        </div>
    );

}

export default Menu;
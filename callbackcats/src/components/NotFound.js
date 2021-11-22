import { useHistory } from "react-router";

const NotFound = props => {

    const history = useHistory()


    return (
        <div className="App">
            
          {props.user != null &&
            <div>
              <div style={{width:'fit-content', margin:'0 auto', padding:'2.5em'}}>
                  <h1>
                      <strong>404</strong> {' '}
                      | The page you requested was not found.
                  </h1>
              </div>
            </div>
          }

          {props.user === null &&
            history.push("/")
          }

        </div>
    )
}

export default NotFound;
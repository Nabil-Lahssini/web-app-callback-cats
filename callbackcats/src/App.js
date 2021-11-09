import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import CreateSandwich from './components/CreateSandwich';

function App() {
  return (
    <div className="App">
      <Login />
      {/* <CreateSandwich /> */}
    </div>
  );
}

export default App;

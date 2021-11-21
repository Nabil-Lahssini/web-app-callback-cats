import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import { useState } from 'react';

import logo from "./icon.png"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Navbar, Container, Nav } from "react-bootstrap";

import Menu from './components/Menu';
import Product from './components/Product';
import Dashboard from "./components/Dashboard";
import Cart from './components/Cart';
import Profile from './components/Profile';
import CreateSandwich from './components/CreateSandwich';
import Login from './components/Login';
import Stock from './components/stock/Stock';
import EditStock from './components/stock/EditStock'
import CreateStock from './components/stock/CreateStock'
import Orders from './components/Orders'

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {type: "normal"});

  const login = async user => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const logout = async _ => {
    localStorage.setItem("user", null);
    setUser(JSON.parse(localStorage.getItem("user")));
  }

  // const userChanged = async _ => {
  //   getUser(user._id)
  //     .then(response => {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //       setUser(response.data);
  //     });
  // }

  const addToCart = async (product, quantity) => {
    let c = [...cart, {product, quantity}];
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
  }

  const updateCart = async (id, quantity) => {
    let c = cart.map(i => {
      if (i.product._id === id) i.quantity = quantity
      return i;
    });
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
  }

  const removeFromCart = async id => {
    let c = cart.filter(item => item.product._id !== id);
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
  }

  const emptyCart = async _ => {
    let c = [];
    localStorage.setItem('cart', JSON.stringify(c));
    setCart(c);
  }

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Eatee logo"
            />
            Eatee
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="menu">Menu</Nav.Link>
              <Nav.Link href="cart">Cart</Nav.Link>

              {/* {user.type == "normal" && */}
              <Nav.Link href="createsandwich">Create a sandwich</Nav.Link>
              {/* } */}
              
              <Nav.Link href="login">Login</Nav.Link>

              {/* admin */}
              {user.type == "admin" &&
                <div>
                  <Nav.Link href="dashboard">Dashboard</Nav.Link>
                </div>
              }

              {/* student or teacher */}
              {user.type == "normal" &&
                <div>
                  <Nav.Link href="profile">Profile</Nav.Link>
                </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Switch>
        <Route
          exact
          path={["/", "/menu"]}
          render={ props => (
            <Menu {...props}  />
          )}>
        </Route>
        <Route 
          exact
          path="/cart"
          render={ props => (
            <Cart {...props} cart={cart} removeFromCart={removeFromCart} updateCart={updateCart} />
          )}>
        </Route>
        <Route
          exact
          path="/profile"
          render={ props => (
            <Profile {...props} user={user} logout={logout} />
          )}>
        </Route>
        <Route
          exact
          path="/product"
          render={ props => (
            <Product {...props}  />
          )}>
        </Route>
        <Route
        exact
        path="/dashboard"
        render ={ props => (
          <Dashboard {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/createsandwich"
        render ={ props => (
          <CreateSandwich {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/login"
        render ={ props => (
          <Login {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/dashboard/stock"
        render ={ props => (
          <Stock {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/dashboard/stock/create"
        render ={ props => (
          <CreateStock {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/dashboard/stock/edit"
        render ={ props => (
          <EditStock {...props} />
        )}>
        </Route>
        <Route
        exact
        path="/dashboard/orders"
        render ={ props => (
          <Orders {...props} />
        )}>
        </Route>
      </Switch>

    </div>
  );
};

export default App;
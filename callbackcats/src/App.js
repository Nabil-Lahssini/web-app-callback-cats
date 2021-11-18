import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import Cart from './components/Cart';
import Profile from './components/Profile';
import { useState } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Menu from './components/Menu';
import Product from './components/Product';

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

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
      
      <Switch>
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
          path="/menu"
          render={ props => (
            <Menu {...props}  />
          )}>
        </Route>
        <Route
          exact
          path="/product"
          render={ props => (
            <Product {...props}  />
          )}>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

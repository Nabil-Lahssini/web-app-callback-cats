import React from "react";
import "./App.css";

// We use Route in order to define the different routes of our application
import {
  Route,
  Switch,
} from "react-router-dom";

// Pages
import DashboardPage from "./pages/dashboard";
import StockPage from "./pages/stock";
import PlacedOrdersPage from "./pages/placed_orders";
import NotFoundPage from "./pages/notfound";

// We import all the components we need in our app
import Edit from "./components/stock/edit_stock";
import Create from "./components/stock/create_stock";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/stock" component={StockPage} />
        <Route exact path="/orders" component={PlacedOrdersPage} />

        <Route path="/create">
          <Create />
        </Route>
        <Route path="/edit/:id" component={Edit} />

        <Route exact component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
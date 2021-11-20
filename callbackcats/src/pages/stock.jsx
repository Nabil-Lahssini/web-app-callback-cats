import React from "react";

import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

// Components
import StockList from "../components/stock/stock_list";

const StockPage = () => {
  return (
    <div style={{ margin: "15px"}}>
      <h1> Stock Management </h1>
      <div>
        <Link to="/">
            <Button variant="danger">Go back</Button>
        </Link>

        <Link style={{ float:"right" }} to="/create">
            <Button variant="success">+ Add stock</Button>
        </Link>
      </div>
      <StockList></StockList>
    </div>
  );
};

export default StockPage;
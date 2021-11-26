import axios from "axios";

let http = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? `http://localhost:${process.env.REACT_APP_API_PORT}/api/v1/` : `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/v1/`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

// MENUS
export const getMenus = _ => {
  return http.get("menus");
}

// PRODUCTS
export const getProducts = _ => {
  return http.get("products");
}

export const getProduct = productId => {
  return http.get(`products/${productId}`);
}

export const updateStock = product => {
  return http.post("products/edit", product);
}

export const addProduct = product => {
  return http.post("products/add", product);
}

// USER
export const login = user => {
  return http.post("login", user);
}

export const createPaymentIntent = (items) => {
  return http.post(`createPaymentIntent`, { items });
}

// ORDERS
export const getOrders = _ => {
  return http.get("orders");
}

export const addOrder = (userId, order) => {
  return http.post("addOrder", { userId, order });
}

export const removeOrder = order => {
  return http.post("removeOrder", order);
}
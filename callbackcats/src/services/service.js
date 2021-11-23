import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:80/api/v1/",
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
  return http.post(`createPaymentIntent`, {items});
}

// ORDERS
export const getOrders = _ => {
  return http.get("orders");
}

export const addOrder = (userId, order) => {
  return http.post("addOrder", {userId, order});
}

export const removeOrder = order => {
  return http.post("removeOrder", order);
}
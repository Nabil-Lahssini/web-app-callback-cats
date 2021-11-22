import axios from "axios";

const http = axios.create({
  baseURL: "https://api.eateecats.be/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

export const getProduct = productId => {
  return http.get(`product/${productId}`);
}

export const getMenus = _ => {
  return http.get("menus");
}

export const login = user => {
  return http.post("login", user);
}

export const createPaymentIntent = (items) => {
  return http.post(`createPaymentIntent`, {items});
}

export const getOrders = _ => {
  return http.get("orders");
}

export const addOrder = (userId, order) => {
  return http.post("addOrder", {userId, order});
}

export const removeOrder = order => {
  return http.post("removeOrder", order);
}

export const getProducts = _ => {
  return http.get("products");
}

// export const register = user => {
//     return http.post(`register`, user);
// }

// export const verifyUserLogin = token => {
//     return http.post(`verifyUserLogin`, token);
// }

// export const verifyUserRegister = token => {
//     return http.post(`verifyUserRegister`, token);
// }

// export const getDataUrl = userId => {
//     return http.post(`getDataUrl`, {userId});
// }

// export const enableTwofa = token => {
//     return http.post(`enableTwofa`, token);
// }

// export const disableTwofa = token => {
//     return http.post(`disableTwofa`, token);
// }
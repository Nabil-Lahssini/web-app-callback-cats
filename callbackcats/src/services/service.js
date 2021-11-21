import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4001/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});

export const getProduct = productId => {
  return http.post(`getProduct`, {productId});
}

export const getMenus = _ => {
  return http.get(`getMenus`);
}

export const login = user => {
  return http.post(`login`, user);
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
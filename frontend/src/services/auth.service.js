import axios from "axios";

const API_URL = "http://localhost:5000/authorization/";

/*
const register = (username, email, password) => {
    return axios.post(API_URL = "signup", {
        email,
        password,
    });
};
*/

const isLoginned = () => {
  return localStorage.getItem("token") !== null;
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, logout, isLoginned };

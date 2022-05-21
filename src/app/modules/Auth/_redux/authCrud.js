// import axios from "../../../../redux/axios";
import axios from "axios";

export const LOGIN_URL = "user/login";
export const REGISTER_URL = "user/signup";
export const REQUEST_PASSWORD_URL = "user/updatepassword";

export const ME_URL = "user/getOne";

export function login(Email, Password) {
  return axios.post(LOGIN_URL, { Email, Password });
}

export function register( Email,FirstName, LastName, Password, Genre, Age ) {
  return axios.post(REGISTER_URL, { FirstName, LastName, Email, Password, Genre, Age });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

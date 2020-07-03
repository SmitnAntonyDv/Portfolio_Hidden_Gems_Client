import axios from "axios";
import { url } from "../../config/constants";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

export const logOut = () => ({ type: LOG_OUT });

const loginSuccess = (userWithToken) => {
  //   console.log(userWithToken);
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

export function logingIn(email, password) {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`${url}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(res.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function signUp(name, email, password, phoneNumber) {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`${url}/signup`, {
        name,
        email,
        password,
        phoneNumber,
      });

      dispatch(loginSuccess(res.data));
    } catch (e) {
      console.log(e);
    }
  };
}

import axios from "axios";
import { url } from "../../config/constants";
import { selectToken } from "./selector";

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
const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export function logingIn(email, password) {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`${url}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(res.data));
      console.log("WHAT IS MY RES.DATA?", res.data);
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

export function getUserWithStoredToken() {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    try {
      const res = await axios.get(`${url}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token still valid
      console.log("WHAT INFO AM I GETTING HERE?!", res.data);
      dispatch(tokenStillValid(res.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOut());
    }
  };
}

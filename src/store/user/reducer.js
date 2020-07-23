import { LOGIN_SUCCESS, LOG_OUT, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  id: null,
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  latitude: null,
  longitude: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...payload };

    default:
      return state;
  }
};

import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./actions";
import { bindActionCreators } from "redux";

const initialState = {
  loading: false,
  message: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: null };

    default:
      return state;
  }
};

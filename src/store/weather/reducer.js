import { weatherFetchSuccess } from "./actions";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case weatherFetchSuccess:
      console.log("DO I HAVE IT?", payload);
      return { ...state, ...payload };

    default:
      return state;
  }
};

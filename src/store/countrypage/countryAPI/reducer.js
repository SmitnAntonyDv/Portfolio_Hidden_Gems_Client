import { GotCountryInfo } from "./actions";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GotCountryInfo:
      return { ...state, ...payload };

    default:
      return state;
  }
};

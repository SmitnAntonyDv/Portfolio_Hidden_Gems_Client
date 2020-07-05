import { GOT_USER_LOCATION } from "./actions";
const initialState = {
  continent: null,
  city: null,
  neighbourhood: null,
  postcode: null,
  road: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GOT_USER_LOCATION:
      return { ...state, ...payload };

    default:
      return state;
  }
};

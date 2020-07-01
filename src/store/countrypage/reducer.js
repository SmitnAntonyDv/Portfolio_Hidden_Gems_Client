import { GotCountryData } from "./actions";

const initialState = {
  id: null,
  name: null,
  locationposts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GotCountryData:
      // console.log("what is my payload?", payload);
      return { ...payload };

    default:
      return state;
  }
};

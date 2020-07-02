import { FetchedPost } from "./actions";
const initialState = {
  id: null,
  countryId: null,
  title: null,
  description: null,
  imageUrl: null,
  latitude: null,
  longitude: null,
  userId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FetchedPost:
      console.log("WHAT IS MY PAYLOAD", payload);
      return { ...payload };

    default:
      return state;
  }
};

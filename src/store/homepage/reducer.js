const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCHED_COUNTRY_POSTS_DATA_SUCCESSFULL":
      // console.log("MY PAYLOAD", payload);
      return [...payload];

    default:
      return state;
  }
};

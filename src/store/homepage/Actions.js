import Axios from "axios";
import { url } from "../../config/constants";

export function dataSuccesfullyFetched(data) {
  return {
    type: "FETCHED_COUNTRY_POSTS_DATA_SUCCESSFULL",
    payload: data,
  };
}

export function fetchCountries(id) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await Axios.get(`${url}/locations`);
      // console.log("correct data?", res.data);
      dispatch(dataSuccesfullyFetched(res.data));
    } catch (e) {
      console.log("error message:", e);
    }
  };
}

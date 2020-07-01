import Axios from "axios";

export function fetchCountries(id) {
  console.log("inside my function");
  return async function thunk(dispatch, getState) {
    try {
      const res = await Axios.get();
    } catch (e) {
      console.log("error message:", e);
    }
  };
}

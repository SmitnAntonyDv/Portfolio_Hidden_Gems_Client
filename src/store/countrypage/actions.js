import Axios from "axios";
import { url } from "../../config/constants";
export const GotCountryData = "GOT_COUNTRY_SPECIFIC_DATA_SUCCESS";

function infoFetched(data) {
  return {
    type: GotCountryData,
    payload: data,
  };
}

export function fetchCountryRelatedData(countryId) {
  return async function thunk(dispatch, getState) {
    console.log("working?");
    try {
      const res = await Axios.get(`${url}/locations/${countryId}/posts`);
      //   console.log("correct data?", res.data);
      dispatch(infoFetched(res.data));
    } catch (e) {
      console.log("ERROR MESSAGE", e);
    }
  };
}

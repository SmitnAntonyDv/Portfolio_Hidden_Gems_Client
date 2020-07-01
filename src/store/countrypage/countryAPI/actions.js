import Axios from "axios";
import { url } from "../../../config/constants";
export const GotCountryInfo = "GOT_CountryAPI_INFO_SUCCESS";

function countryInfoFetched(data) {
  return {
    type: GotCountryInfo,
    payload: data,
  };
}

export function fetchCountryInfo(countryName) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await Axios.get(
        `https://restcountries.eu/rest/v2/name/${countryName}`
      );
      console.log("did I get my data?", res.data[0]);
      dispatch(countryInfoFetched(res.data[0]));
    } catch (e) {
      console.log("error message:", e);
    }
  };
}

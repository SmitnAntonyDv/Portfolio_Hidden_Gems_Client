import Axios from "axios";
export const GotCountryInfo = "GOT_CountryAPI_INFO_SUCCESS";

function countryInfoFetched(data) {
  return {
    type: GotCountryInfo,
    payload: data,
  };
}

export function fetchCountryInfo(name) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await Axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );
      console.log("did I get my data?", res.data[0]);
      dispatch(countryInfoFetched(res.data[0]));
    } catch (e) {
      console.log("error message:", e);
    }
  };
}

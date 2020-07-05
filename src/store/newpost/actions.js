import axios from "axios";
import { url, geocodeAPI, geoS } from "../../config/constants";

export const GOT_USER_LOCATION = "GOT_USER_LOCATION";

export function newPost(
  title,
  description,
  imageUrl,
  adress,
  token,
  id,
  countryId
) {
  return async (dispatch, getState) => {
    console.log("working");
    try {
      const res = await axios.post(`${url}/newpost`, {
        title,
        description,
        imageUrl,
        adress,
        userId: id,
        countryId,
        latitude: "something",
        longitude: "something",
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function GotUserLocation(data) {
  return {
    type: GOT_USER_LOCATION,
    payload: data,
  };
}

export function getAdress(latitude, longitude) {
  return async function thunk(dispatch, getState) {
    console.log("I AM BEING RENDERED! ");
    try {
      const res = await axios.get(
        `${geocodeAPI}q=${latitude}+${longitude}&key=${geoS}`
      );
      //   console.log("WHAT IS MY DATA?", res.data.results[0].components);
      dispatch(GotUserLocation(res.data.results[0].components));
    } catch (e) {
      console.log(e);
    }
  };
}

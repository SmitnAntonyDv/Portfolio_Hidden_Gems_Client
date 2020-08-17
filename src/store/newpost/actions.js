import axios from 'axios';
import { url, geocodeAPI, geoS } from '../../config/constants';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';

export const GOT_USER_LOCATION = 'GOT_USER_LOCATION';
export const POST_SUCCESFULL = 'POST_SUCCESFULL';
export const POST_UNSUCCESSFULL = 'POST_UNSUCCESSFULL';

export function newPost(
  title,
  description,
  imageUrl,
  adress,
  token,
  id,
  countryId,
  latitude,
  longitude,
  name,
  email
) {
  return async (dispatch, getState) => {
    console.log('working');
    try {
      const res = await axios.post(
        `${url}/newpost`,
        {
          title,
          description,
          imageUrl,
          adress,
          userId: id,
          countryId,
          latitude,
          longitude,
          name,
          email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(
        showMessageWithTimeout(
          'success',
          false,
          'Thank you for sharing your precious location with the community!'
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        console.log('ERROR ERROR!', error.response.data.message);
        dispatch(setMessage('danger', true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage('danger', true, error.message));
      }
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
    console.log('I AM BEING RENDERED! in filename');
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

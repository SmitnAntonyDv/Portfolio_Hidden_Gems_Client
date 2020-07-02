import Axios from "axios";
import { url } from "../../config/constants";

export const FetchedPost = "POST_DATA_FETCH_SUCCESS";

export function postFetchSuccess(data) {
  return {
    type: FetchedPost,
    payload: data,
  };
}

export function FetchPost(postId) {
  return async function thunk(dispatch, getState) {
    // console.log("working?");
    try {
      const res = await Axios.get(`${url}/locationpost/${postId}`);
      // console.log("correct data?", res.data);
      dispatch(postFetchSuccess(res.data));
    } catch (e) {
      console.log("ERROR MESSAGE", e);
    }
  };
}

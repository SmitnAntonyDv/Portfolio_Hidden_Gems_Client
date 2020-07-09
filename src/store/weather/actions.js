import Axios from "axios";
export const weatherFetchSuccess = "FETCH_WEATHER_SUCCESS";

export function WeatherFetchSucces(data) {
  return {
    type: weatherFetchSuccess,
    payload: data,
  };
}

export function FetchWeather(latitude, longitude) {
  return async function thunk(dispatch, getState) {
    // console.log("working? FETCHWEATHER", latitude, longitude);
    try {
      const res = await Axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5dc4f703df7541395af93b0beab81835`
      );
      // console.log("WHAT BE THE RESPONSE CHIEF?", res.data);
      dispatch(WeatherFetchSucces(res.data));
    } catch (e) {
      console.log("ERROR MESSAGE", e);
    }
  };
}

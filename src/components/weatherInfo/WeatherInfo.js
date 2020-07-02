import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchWeather } from "../../store/weather/actions";
import { selectWeather } from "../../store/weather/selectors";
import moment from "moment";

export default function WeatherInfo(props) {
  const weatherData = useSelector(selectWeather);
  const dispatch = useDispatch();
  const { latitude, longitude } = props;
  const { main, winds, weather, sys, clouds } = weatherData;
  // K-273.15. = Celcius
  const convert = 273.15;

  function renderWeatherInfo() {
    // console.log(main.temp);
    if (main) {
      console.log(main.temp);
      return (
        <div>
          <h2>
            The weather conditions at this location
            <p>
              Local Temperature at this location is:{" "}
              {(main.temp - convert).toFixed(1)} degrees
              <br />
              Local Temperature feels like{" "}
              {(main.feels_like - convert).toFixed(1)} degrees
            </p>
            <p>Local humidity is: {main.humidity}</p>
            <div> local Weather description: {weather[0].description}</div>
            <p>TODO: display sunrise / sunset times with moment.js</p>
          </h2>
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(FetchWeather(Number(latitude), Number(longitude)));
  }, []);
  return (
    <div>
      <h1>I AM A WEATHER COMPONENT</h1>
      {renderWeatherInfo()}
    </div>
  );
}

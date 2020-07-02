import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchWeather } from "../../store/weather/actions";

export default function WeatherInfo(props) {
  const dispatch = useDispatch();
  const { latitude, longitude } = props;

  useEffect(() => {
    dispatch(FetchWeather(Number(latitude), Number(longitude)));
  }, [props]);
  return (
    <div>
      <h1>I AM A WEATHER COMPONENT</h1>
    </div>
  );
}

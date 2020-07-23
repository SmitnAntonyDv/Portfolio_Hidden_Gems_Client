import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchWeather } from "../../store/weather/actions";
import { selectWeather } from "../../store/weather/selectors";
import { WiDegrees } from "react-icons/wi";
import moment from "moment";
import { Col } from "react-bootstrap";

export default function WeatherInfo(props) {
  const weatherData = useSelector(selectWeather);
  const dispatch = useDispatch();
  const { latitude, longitude } = props;
  const { main, winds, weather, sys, clouds } = weatherData;
  // K-273.15. = Celcius
  const convert = 273.15;

  function renderWeatherInfo() {
    if (main) {
      console.log(main.temp);
      return (
        <div className='weather-content-wrapper'>
          <div className='weather-content-info'>
            <Col md={6} className='temp'>
              <strong>Local Temperature is</strong>:{" "}
              {(main.temp - convert).toFixed(1)} &#x2103;
              <br />
              <strong>feels like </strong>:{" "}
              {(main.feels_like - convert).toFixed(1)} &#x2103;
            </Col>
            <Col md={6} className='forecast'>
              <strong>Local humidity is</strong>: {main.humidity}%
              <br />
              <strong>local Weather </strong>: {weather[0].description}
              <br />
              <strong>Chance on clouds</strong>:{clouds.all} %
              <br />
            </Col>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(FetchWeather(Number(latitude), Number(longitude)));
  }, []);
  return <div>{renderWeatherInfo()}</div>;
}

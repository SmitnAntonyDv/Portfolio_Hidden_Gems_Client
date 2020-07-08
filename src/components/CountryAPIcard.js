import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryInfo } from "../store/countrypage/countryAPI/actions";
import { selectCountryInfo } from "../store/countrypage/countryAPI/selector";
import { CardGroup, Card, Image } from "react-bootstrap";

export default function CountryAPIcard(props) {
  const dispatch = useDispatch();
  const info = useSelector(selectCountryInfo);
  const { name } = props;

  useEffect(() => {
    dispatch(fetchCountryInfo(name));
  }, [name]);

  console.log("CORRECT INFO?", info);
  return (
    <CardGroup className='APIcard'>
      <Card className='APIcountryInfo'>
        <h2 className='general-info-title'> General {info.name} Info</h2>
        <hr />
        <div className='api-country-info-body-text'>
          <p>
            <strong>Capital</strong>: {info.capital}
          </p>
          <p>
            <strong>Population</strong>: {info.population}
          </p>
          <p>
            <strong>located in</strong>: {info.subregion}
          </p>
          <p>
            <strong>timezone(s)</strong>: {info.timezones}
          </p>
          <p>
            <strong>national callingCode </strong>: +{info.callingCodes}
          </p>
        </div>
      </Card>

      <Card className='Flag'>
        <h2>National Flag</h2>
        <hr className='divide-line' />
        <div className='flagpicture'>
          <Image className='countryFlag' src={info.flag} />
        </div>
      </Card>
    </CardGroup>
  );
}

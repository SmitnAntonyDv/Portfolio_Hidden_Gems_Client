import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryInfo } from "../store/countrypage/countryAPI/actions";
import { selectCountryInfo } from "../store/countrypage/countryAPI/selector";
import { CardGroup, Card } from "react-bootstrap";

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
        <p>Capital: {info.capital}</p>
        <p>Population: {info.population}</p>
        <p>
          {info.name} is located in {info.subregion}
        </p>
        <p>
          {info.name} has the timezone(s): {info.timezones}
        </p>
        <p>Their national callingCode is: +{info.callingCodes}</p>
      </Card>

      <Card className='Flag'>
        <img className='countryFlag' src={info.flag} />
      </Card>
    </CardGroup>
  );
}

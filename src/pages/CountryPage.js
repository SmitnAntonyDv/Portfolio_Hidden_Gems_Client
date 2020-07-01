import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryRelatedData } from "../store/countrypage/actions";

export default function CountryPage() {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  console.log("what my params?", countryId);

  useEffect(() => {
    dispatch(fetchCountryRelatedData(countryId));
  });

  return (
    <div>
      <p>COUNTRY PAGE</p>
      <p>To do:</p>
      <ul>
        <li>dispatch data</li>
        <li>store data in store</li>
        <li>select data</li>
        <li>display some data here</li>
        <li>display title / desc / img / geo-location</li>
        <li>make "View details" button</li>
        <li>Import country specific API data</li>
        <li>display some basic country specific data at buttom</li>
        <li>style page according to wireframe</li>
        <li>finished</li>
      </ul>
    </div>
  );
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryRelatedData } from "../store/countrypage/actions";
import { selectSpecificCountryInfo } from "../store/countrypage/selectors";

export default function CountryPage() {
  const dispatch = useDispatch();
  const countryInfo = useSelector(selectSpecificCountryInfo);
  const { countryId } = useParams();
  // console.log("what my params?", countryId);

  function renderCountryPost() {
    if (!countryInfo) {
      console.log("no data yet chief!");
      return <h2>Loading posts chief! . . . </h2>;
    } else {
      return (
        <div>
          <p>testing</p>
          {countryInfo.map((post) => {
            return (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <img src={post.imageUrl} />
                location :{post.adress}
              </li>
            );
          })}
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(fetchCountryRelatedData(countryId));
  }, []);

  return (
    <div>
      <p>COUNTRY PAGE</p>
      <p>To do:</p>
      <ul>
        <li>display some data here</li>
        <li>display title / desc / img / geo-location</li>
        <li>make "View details" button</li>
        <li>Import country specific API data</li>
        <li>display some basic country specific data at buttom</li>
        <li>style page according to wireframe</li>
        <li>finished</li>
      </ul>
      {renderCountryPost()}
    </div>
  );
}

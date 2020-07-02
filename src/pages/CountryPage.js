import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryPosts } from "../store/countrypage/actions";

import { selectSpecificCountryInfo } from "../store/countrypage/selectors";

import CountryAPIcard from "../components/CountryAPIcard";

export default function CountryPage() {
  const dispatch = useDispatch();
  const countryInfo = useSelector(selectSpecificCountryInfo);

  const { countryId } = useParams();

  function renderCountryPost() {
    if (!countryInfo) {
      // console.log("no data yet chief!");
      return <h2>Loading posts chief! . . . </h2>;
    } else {
      return (
        <div>
          <div>
            <button>Most liked</button>
            <button>Most Recent</button>
            <button>closest to your location</button>
          </div>
          {countryInfo.locationposts.map((post) => {
            return (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <img src={post.imageUrl} alt='' />
                <p>location :{post.adress}</p>
                <h2>
                  TODO: LINK LAT / LONG VALUES to geocoding google API
                  (according to googleAPI)
                </h2>
                <p>
                  latitude: {post.latitude},
                  <br />
                  longitude: {post.longitude}
                </p>
                lat:
                <Link to={`/locations/${post.id}/details`}>
                  <button>Explore this location!</button>
                </Link>
              </li>
            );
          })}
        </div>
      );
    }
  }
  function renderCountryInfo() {
    if (!countryInfo.name) {
      // console.log("No info yet chief");
      return <h2>Loading Country info . . .</h2>;
    } else {
      return (
        <div>
          <CountryAPIcard name={countryInfo.name} />
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(fetchCountryPosts(countryId));
  }, []);

  return (
    <div>
      <p>COUNTRY PAGE</p>
      <p>To do:</p>
      <ul>
        <li>style page according to wireframe</li>
      </ul>
      {renderCountryPost()}
      {renderCountryInfo()}
    </div>
  );
}

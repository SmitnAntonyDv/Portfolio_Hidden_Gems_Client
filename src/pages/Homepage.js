import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/homepage/Actions";
import { selectAllCountryInfo } from "../store/homepage/selectors";

export default function Homepage() {
  const dispatch = useDispatch();
  const countryAndPostData = useSelector(selectAllCountryInfo);

  function renderData() {
    if (!countryAndPostData) {
      // console.log("no data");
      return <h2>Loading...</h2>;
    } else {
      // console.log("have data!");
      return (
        <div>
          <p>Hello</p>
          {countryAndPostData.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/locations/${item.id}/posts`}>
                  <button> {item.name}</button>
                </Link>
              </li>
            );
          })}
        </div>
      );
    }
  }

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <div>
      I AM THE HOMEPAGE
      <div>
        <h2>Some info</h2>
        {renderData()}
      </div>
    </div>
  );
}

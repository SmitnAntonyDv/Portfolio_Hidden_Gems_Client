import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/homepage/Actions";
import { selectAllCountryInfo } from "../store/homepage/selectors";
import { Button } from "react-bootstrap";

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
          {countryAndPostData.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/locations/${item.id}/posts`}>
                  <button> {item.name}</button>
                  <>
                    <Button variant='primary' size='lg' block>
                      {item.name}
                    </Button>
                  </>
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
      <div className='heroBanner'>
        <h1 className='hero-text'>What will you explore next?</h1>
      </div>
      <span className='homepageButtonWrapper'>
        <div className='homepageButton'>{renderData()}</div>
      </span>
    </div>
  );
}

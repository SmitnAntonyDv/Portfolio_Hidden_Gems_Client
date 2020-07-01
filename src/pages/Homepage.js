import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../store/homepage/Actions";

export default function Homepage() {
  const dispatch = useDispatch();

  const id = 1;

  useEffect(() => {
    dispatch(fetchCountries(id));
  }, []);
  return (
    <div>
      I AM THE HOMEPAGE
      <h1>What are you exploring next?</h1>
      <div>
        <Link to={`/locations/${"1"}/posts`}>
          <button>Thailand</button>
        </Link>
        <Link to={`/locations/${"2"}/posts`}>
          <button>Indonesia</button>
        </Link>
        <Link to={`/locations/${"3"}/posts`}>
          <button>Vietnam</button>
        </Link>
        <Link to={`/locations/${"4"}/posts`}>
          <button>Singapore</button>
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSpecificCountryInfo } from "../../store/countrypage/selectors";

export default function Toolbar() {
  const countryName = useSelector(selectSpecificCountryInfo);
  console.log("what for info is this?", countryName.name);

  function renderCountryButton() {
    if (countryName.name) {
      return (
        <Link to={"/"}>
          <button>Explore another Country</button>
        </Link>
      );
    }
  }

  return (
    <div>
      <div>
        <div>
          <button>menu toggle</button>
        </div>
        <div>
          {renderCountryButton()}
          <p>Todo: change button for other detailpage</p>
        </div>
        <div>
          <div>LOGO</div>
        </div>
      </div>
    </div>
  );
}

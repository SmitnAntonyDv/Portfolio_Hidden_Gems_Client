import React from "react";
import { Link, useHistory, useParams, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSpecificCountryInfo } from "../../store/countrypage/selectors";
import { selectCountryInfo } from "../../store/countrypage/countryAPI/selector";

export default function Toolbar() {
  const country = useSelector(selectSpecificCountryInfo);
  const history = useHistory();
  const { userId } = useParams();
  console.log("Which Country BISH?", country.id);
  console.log("WHAT MA HISTORY BISH", history.location.pathname);
  console.log("Who am I ? ", userId);

  const match = matchPath(history.location.pathname, {
    path: `/locations/:userId/details`,
  });
  //   console.log("who am I?", match.params.userId);
  //   console.log("DA SOLUTION!???", match);
  function userID() {
    if (match.params.userId) {
      return match.params.userId;
    }
  }

  function renderCountryButton() {
    if (history.location.pathname === `/locations/${country.id}/posts`) {
      return (
        <Link to={"/"}>
          <button>Explore other Countries</button>
        </Link>
      );
    } else if (history.location.pathname === `/locations/${userID}/details`) {
      return (
        <Link to={`/locations/${country.id}/posts`}>
          <button>test</button>
        </Link>
      );
    } else {
      return <div>{null}</div>;
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

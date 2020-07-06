import React from "react";
import { Link, useHistory, useParams, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSpecificCountryInfo } from "../../store/countrypage/selectors";
import { selectPostId } from "../../store/detailpage/selectors";
import { selectToken } from "../../store/user/selector";
import "../../App.css";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./loggedOut";

export default function Toolbar() {
  const country = useSelector(selectSpecificCountryInfo);
  const postId = useSelector(selectPostId);
  const history = useHistory();
  const { userId } = useParams();
  const token = useSelector(selectToken);
  // console.log("Which Country BISH?", country.id);
  // console.log("WHAT MA HISTORY BISH", history.location.pathname);
  // console.log("Who am I ? ", userId);

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

  const loginControls = token ? <LoggedIn /> : <LoggedOut />;
  const postIfLoggedIn = token ? (
    <Nav.Link eventKey={2} href='/user/postlocation'>
      Post your Must-visit
    </Nav.Link>
  ) : (
    []
  );

  function renderCountryButton() {
    if (history.location.pathname === `/locations/${postId}/details`) {
      return <Link to={`/locations/${country.id}/posts`}>TESTIIIING !!!!</Link>;
    } else {
      return <div>{null}</div>;
    }
  }
  function renderCountrybtn() {
    return <Link to={`/locations/${country.id}/posts`}>{country.name}</Link>;
  }
  console.log("THIS DATA!!!", postId);
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Explore Hidden Gems</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>{renderCountryButton()}</Nav>
        <Nav>
          <Nav.Link>{renderCountrybtn()}</Nav.Link>
        </Nav>
        <Nav>
          {postIfLoggedIn}
          {loginControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

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

  const loginControls = token ? <LoggedIn /> : <LoggedOut />;
  const postIfLoggedIn = token ? (
    <Nav.Link eventKey={2} href='/user/postlocation'>
      Post your Must-visit
    </Nav.Link>
  ) : (
    []
  );
  let postPath = `/locations/${country.id}/posts`;

  function renderCountryButton() {
    if (history.location.pathname === `/locations/${postId}/details`) {
      return <Nav.Link href={postPath}>Explore {country.name}</Nav.Link>;
    } else {
      return <div>{null}</div>;
    }
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Explore Hidden Gems</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>{[]}</Nav>
        <Nav>
          {renderCountryButton()}
          {postIfLoggedIn}
          {loginControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

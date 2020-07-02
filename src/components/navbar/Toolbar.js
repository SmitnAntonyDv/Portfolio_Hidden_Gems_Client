import React from "react";
import { Link, useHistory, useParams, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSpecificCountryInfo } from "../../store/countrypage/selectors";
import { selectCountryInfo } from "../../store/countrypage/countryAPI/selector";
import "../../App.css";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Toolbar() {
  const country = useSelector(selectSpecificCountryInfo);
  const history = useHistory();
  const { userId } = useParams();
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

  function renderCountryButton() {
    if (history.location.pathname === `/locations/${country.id}/posts`) {
      return <Nav.Link href='/'>Explore other Countries</Nav.Link>;
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
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Explore Hidden Gems</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/locations/:countryId/posts'>
            {renderCountryButton()}
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='#deets'>Login</Nav.Link>
          <Nav.Link eventKey={2} href='#memes'>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

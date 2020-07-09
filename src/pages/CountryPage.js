import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryPosts } from "../store/countrypage/actions";
import { selectSpecificCountryInfo } from "../store/countrypage/selectors";
import CountryAPIcard from "../components/CountryAPIcard";
import { selectUser } from "../store/user/selector";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

export default function CountryPage() {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  const countryInfo = useSelector(selectSpecificCountryInfo);
  const userCoords = useSelector(selectUser);
  const { latitude, longitude, token } = userCoords;

  const [postDistanceArray, setpostDistanceArray] = useState("");
  const [orderByDistance, setOrderByDitance] = useState(true);
  const [UPDlatitude, setLatitude] = useState("");
  const [UPDlongitude, setLongitutde] = useState("");
  // console.log();

  // haversine formula function
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //lat1&lon1 is location of user whereas lat2&lon2 is location from suggested spot
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  //hardcoded UserLocation (Bali Denspar)
  let userLocation;
  if (!!latitude && !!longitude) {
    userLocation = {
      lat: Number(latitude),
      lon: Number(longitude),
    };
  } else {
    userLocation = {
      lat: Number(UPDlatitude),
      lon: Number(UPDlongitude),
    };
  }
  // console.log("STILL WORKS?", userLocation);
  // console.log("LATITUDE", latitude, "| LONGITUDE", longitude);

  function ButtonToggleSortDistance() {
    setOrderByDitance(!orderByDistance);
  }

  function updateUserLocation(pos) {
    setLatitude(pos.coords.latitude);
    setLongitutde(pos.coords.longitude);
  }

  function updateLocation() {
    return navigator.geolocation.getCurrentPosition(
      updateUserLocation,
      error,
      options
    );
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const options = { enableHighAccuracy: true };

  //adds distance to the postLocationArray
  let sortedByDistance = [];
  if (postDistanceArray[0]) {
    const test = postDistanceArray.map((locationObject) => {
      const calculatedistance = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lon,
        locationObject.latitude,
        locationObject.longitude
      );
      return { ...locationObject, distance: calculatedistance };
    });
    sortedByDistance = test.sort(
      (a, b) => Number(a.distance) - Number(b.distance)
    );
  }

  function renderSortingButtons() {
    return (
      <Row>
        <Col>
          <div>
            <Button className='sortButton'>Most liked</Button>
            {!!latitude || !!UPDlatitude ? (
              <Button className='sortButton' onClick={ButtonToggleSortDistance}>
                closest to YOUR location
              </Button>
            ) : null}
            {!token ? (
              <Button className='sortButton' onClick={updateLocation}>
                Update my location
              </Button>
            ) : (
              <>
                {["top"].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    placement={placement}
                    overlay={
                      <Tooltip id={`tooltip-${placement}`}>
                        increase accuracy
                      </Tooltip>
                    }
                  >
                    <Button className='sortButton' onClick={updateLocation}>
                      Update my location
                    </Button>
                  </OverlayTrigger>
                ))}
              </>
            )}
          </div>
          <div>
            <h3>
              Welcome to the {countryInfo.name} page, please login or click
              "update my location" to enable distance functionality.
            </h3>
          </div>
        </Col>
      </Row>
    );
  }
  function renderCountryPost() {
    if (!postDistanceArray) {
      return <h2>Loading posts chief! . . . </h2>;
    } else {
      return (
        <CardGroup>
          {orderByDistance
            ? postDistanceArray.map((post) => {
                return (
                  <Card key={post.id} className='countryCard-posts'>
                    <Card.Body>
                      <Card.Title className='card-Title'>
                        {post.title}
                      </Card.Title>
                      <hr />
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>
                        <FaMapMarkerAlt /> {post.adress}
                      </Card.Text>
                      <hr />
                      <Card.Img size='lg' src={post.imageUrl} alt='' />
                      <Link to={`/locations/${post.id}/details`}>
                        <Button
                          varient='primary'
                          size='lg'
                          className='detailButton'
                        >
                          Explore this location!
                        </Button>
                      </Link>
                      <Card.Text>
                        {" "}
                        <AiFillLike /> {post.likes}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })
            : sortedByDistance.map((post) => {
                return (
                  <Card key={post.id} className='countryCard-posts'>
                    <Card.Body>
                      <Card.Title className='card-Title'>
                        {post.title}
                      </Card.Title>
                      <hr />
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>
                        <FaMapMarkerAlt /> {post.adress}
                      </Card.Text>
                      <hr />
                      <Card.Img size='lg' src={post.imageUrl} alt='' />
                      <Link to={`/locations/${post.id}/details`}>
                        <Button
                          varient='primary'
                          size='lg'
                          className='detailButton'
                        >
                          Explore this location!
                        </Button>
                      </Link>
                      <Card.Text>
                        {" "}
                        <AiFillLike /> {post.likes}
                      </Card.Text>
                      <Card.Text>
                        The distance between you and this amazing spot is:{" "}
                        {getDistanceFromLatLonInKm(
                          userLocation.lat,
                          userLocation.lon,
                          post.latitude,
                          post.longitude
                        ).toFixed(2)}{" "}
                        km
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
        </CardGroup>
      );
    }
  }

  function renderCountryInfo() {
    if (!countryInfo.name) {
      // console.log("No info yet chief");
      return <h2>Loading Country info . . .</h2>;
    } else {
      return <CountryAPIcard name={countryInfo.name} />;
    }
  }

  useEffect(() => {
    dispatch(fetchCountryPosts(countryId));
  }, []);
  useEffect(() => {
    setpostDistanceArray(countryInfo.locationposts);
  }, [countryInfo]);

  return (
    <>
      <Container fluid>
        {renderSortingButtons()}
        {renderCountryPost()}
        {renderCountryInfo()}
      </Container>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryPosts } from "../store/countrypage/actions";
import { selectSpecificCountryInfo } from "../store/countrypage/selectors";
import CountryAPIcard from "../components/CountryAPIcard";

import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardGroup,
  Button,
} from "react-bootstrap";

export default function CountryPage() {
  const dispatch = useDispatch();
  const countryInfo = useSelector(selectSpecificCountryInfo);
  const [postDistanceArray, setpostDistanceArray] = useState("");
  const [array, setArray] = useState("");
  const [orderByDistance, setOrderByDitance] = useState(true);
  const { countryId } = useParams();

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
  const userLocation = { lat: Number(-8.65629), lon: Number(115.222099) };

  function ButtonToggleSortDistance() {
    setOrderByDitance(!orderByDistance);
    console.log("ITS ALIVE BABY!!!!");
  }

  //adds distance to the postLocationArray
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
    var sortedByDistance = test.sort(
      (a, b) => Number(a.distance) - Number(b.distance)
    );
    console.log("YES?!", sortedByDistance);
  }

  // console.log("HELLO", sortedByDistance);

  function renderSortingButtons() {
    return (
      <Row>
        <Col>
          <div>
            <button>Most liked</button>
            <button>Most Recent</button>
            <button onClick={ButtonToggleSortDistance}>
              closest to your location
            </button>
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
        <Row>
          <Col>
            <CardGroup style={{ flexDirection: "column" }}>
              {orderByDistance
                ? postDistanceArray.map((post) => {
                    return (
                      <Card key={post.id}>
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>{post.description}</Card.Text>
                          <Card.Img size='lg' src={post.imageUrl} alt='' />
                          <Card.Text>location :{post.adress}</Card.Text>
                          THE DISTANCE BETWEEN YOU AND THIS LOCATION IS:{" "}
                          <p>
                            latitude: {post.latitude},
                            <br />
                            longitude: {post.longitude}
                          </p>
                          <Button varient='primary' size='lg'>
                            <Link to={`/locations/${post.id}/details`}>
                              Explore this location!
                            </Link>
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })
                : sortedByDistance.map((post) => {
                    return (
                      <Card key={post.id}>
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>{post.description}</Card.Text>
                          <Card.Img size='lg' src={post.imageUrl} alt='' />
                          <Card.Text>location :{post.adress}</Card.Text>
                          THE DISTANCE BETWEEN YOU AND THIS LOCATION IS:{" "}
                          {getDistanceFromLatLonInKm(
                            userLocation.lat,
                            userLocation.lon,
                            post.latitude,
                            post.longitude
                          ).toFixed(2)}{" "}
                          km
                          <p>
                            latitude: {post.latitude},
                            <br />
                            longitude: {post.longitude}
                          </p>
                          <Button varient='primary' size='lg'>
                            <Link to={`/locations/${post.id}/details`}>
                              Explore this location!
                            </Link>
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
            </CardGroup>
          </Col>
        </Row>
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
  useEffect(() => {
    setpostDistanceArray(countryInfo.locationposts);
  }, [countryInfo]);
  // console.log("WORKING?", array);

  return (
    <div>
      <Container>
        {renderSortingButtons()}
        {renderCountryPost()}
        {renderCountryInfo()}
      </Container>
    </div>
  );
}

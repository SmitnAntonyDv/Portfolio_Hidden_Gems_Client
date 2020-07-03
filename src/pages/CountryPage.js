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

  const { countryId } = useParams();

  function renderCountryPost() {
    if (!countryInfo) {
      // console.log("no data yet chief!");
      return <h2>Loading posts chief! . . . </h2>;
    } else {
      return (
        <Row>
          <Col>
            <div>
              <button>Most liked</button>
              <button>Most Recent</button>
              <button>closest to your location</button>
            </div>

            <CardGroup style={{ flexDirection: "column" }}>
              {countryInfo.locationposts.map((post) => {
                return (
                  <Card key={post.id}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Img size='lg' src={post.imageUrl} alt='' />
                      <Card.Text>location :{post.adress}</Card.Text>
                      <h2>
                        TODO: LINK LAT / LONG VALUES to geocoding google API
                        (according to googleAPI)
                      </h2>
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

  // haversine forumla function
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
  const userLocation = { lat: -8.65629, lon: 115.222099 };

  function sortPostsByDistance() {
    if (countryInfo) {
      // console.log("ORIGINAL INFO", countryInfo);
      const lat = countryInfo.locationposts.map((loc) => {
        return loc.latitude;
      });
      const lon = countryInfo.locationposts.map((loc) => {
        return loc.longitude;
      });

      // calculating distance between locations and user.
      console.log("USERLAT", userLocation.lat);
      console.log("USERLON", userLocation.lon);
      console.log("LOCATIONLAT", lat[2]);
      console.log("LOCATIONLON", lon[2]);
      console.log(
        "EUREKA?",
        getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lon,
          lat[2],
          lon[2]
        )
      );

      // function closestLocation(postLocation, userLocation) {
      //   console.log("What is my userLocation?", userLocation.lat); //?? it works though?
      //   console.log("what is my postLocation", postLocation);

      //   //calculating distance from user to post1
      //   //formula format
      //   //getDistanceFromLatoLonInKM(lat1, lon1, lat2, lon2)
      //   const sortDistance = (post1, post2) => {
      //     console.log("HELLLOOOO", userLocation.lat);
      //     const distance1 = getDistanceFromLatLonInKm(
      //       userLocation.lat,
      //       userLocation.lon,
      //       post1.lat,
      //       post1.lon
      //     );
      //     //calculating distance from user to post2
      //     const distance2 = getDistanceFromLatLonInKm(
      //       userLocation.lat,
      //       userLocation.lon,
      //       post2.lat,
      //       post2.lon
      //     );
      //     //compare both distances.
      //     return distance1 - distance2;
      //   };
      //   let result = postLocation.sort(sortDistance);
      //   console.log("WHAT MA RESULT", result);
      //   return result;
      // }

      // closestLocation(postLocation, userLocation);
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

  return (
    <div>
      <Container>
        {renderCountryPost()}
        {renderCountryInfo()}
        {sortPostsByDistance()}
      </Container>
    </div>
  );
}

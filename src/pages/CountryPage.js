import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryPosts } from '../store/countrypage/actions';
import {
  selectSpecificCountryInfo,
  selectLocationPost,
} from '../store/countrypage/selectors';
import CountryAPIcard from '../components/CountryAPIcard';
import { selectUser } from '../store/user/selector';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';

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
} from 'react-bootstrap';

export default function CountryPage() {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  const countryInfo = useSelector(selectSpecificCountryInfo);
  const locationpost = useSelector(selectLocationPost);
  const userCoords = useSelector(selectUser);
  const { latitude, longitude, token } = userCoords;

  const [UPDlatitude, setLatitude] = useState('');
  const [UPDlongitude, setLongitutde] = useState('');
  // const [orderByDistance, setOrderByDitance] = useState(true);
  const [sortCards, setSortCards] = useState(true);

  // haversine formula function
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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

  function SortedByLikes() {
    setSortCards('Likes');
  }
  function ButtonToggleSortDistance() {
    setSortCards('Distance');
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
  if (locationpost[0]) {
    const test = locationpost.map((locationObject) => {
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

  //Card Sorting
  let sortingMethod = [];
  if (sortCards === 'Likes') {
    sortingMethod = locationpost.sort(
      (b, a) => Number(a.likes) - Number(b.likes)
    );
  } else if (sortCards === 'Distance') {
    sortingMethod = sortedByDistance;
  } else {
    sortingMethod = locationpost.sort((a, b) => Number(a.id) - Number(b.id));
  }

  function renderSortingButtons() {
    return (
      <Row>
        <Col>
          <div>
            <Button className='sortButton' onClick={SortedByLikes}>
              Most liked
            </Button>
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
                {['top'].map((placement) => (
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
    if (!locationpost) {
      return <h2>Loading posts chief! . . . </h2>;
    } else {
      return (
        <CardGroup className='country-card-wrapper'>
          {sortingMethod.map((post) => {
            return (
              <Card key={post.id} className='countryCard-posts'>
                <Card.Body>
                  <Card.Title className='card-Title'>{post.title}</Card.Title>
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
                    {' '}
                    <AiFillLike /> {post.likes}
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

  return (
    <>
      <Container className='General-Wrapper' fluid>
        {renderSortingButtons()}
        {renderCountryPost()}
        {renderCountryInfo()}
      </Container>
    </>
  );
}

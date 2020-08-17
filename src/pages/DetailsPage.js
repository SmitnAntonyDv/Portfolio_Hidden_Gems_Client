import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPost, incrementLike } from '../store/detailpage/actions';
import { selectPost } from '../store/detailpage/selectors';
import { selectUser } from '../store/user/selector';
import WeatherInfo from '../components/weatherInfo/WeatherInfo';
import LeafletMap from '../components/leafletMap';
import Mymap from '../components/leafletMap';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function DetailsPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const postData = useSelector(selectPost);
  const {
    adress,
    imageUrl,
    latitude,
    longitude,
    title,
    description,
    userId,
    likes,
  } = postData;
  const userData = useSelector(selectUser);
  const { id, token, email } = userData;

  const likeHandler = () => {
    console.log('CLICKED!');
    if (!token) {
      console.log('NO TOKEN');
      alert('please log in to Like a post');
    } else {
      dispatch(incrementLike(postId, likes, token));
    }
  };

  useEffect(() => {
    dispatch(FetchPost(postId));
  }, []);
  return (
    <Container className='detailpage-wrapper' fluid>
      <Row>
        <Col className='detailpage-title'>
          <div>{title}</div>
        </Col>
      </Row>
      <Row className='row-picture-and-description'>
        <Col md={8} className='details-image'>
          <Image src={imageUrl} alt='' fluid />
          <Button onClick={likeHandler}>Like</Button>
        </Col>
        <Col md={4} className='info-col'>
          <h4 className='info-col-title'>Why this is a must visit!</h4>
          <hr />
          <p className='description'>{description}</p>
          <FaMapMarkerAlt /> {adress}
        </Col>
      </Row>
      <hr />
      <Row>
        {/* <Col className='weather-border'>
          <h2>Local Weather Conditions</h2>

          <WeatherInfo latitude={latitude} longitude={longitude} />
        </Col> */}
      </Row>
      <Row>
        <Col className='map-col-leaflet'>
          <Mymap
            latitude={latitude}
            longitude={longitude}
            adress={adress}
            id={postData.id}
          />
        </Col>
      </Row>
    </Container>
  );
}

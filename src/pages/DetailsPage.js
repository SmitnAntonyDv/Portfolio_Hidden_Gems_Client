import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchPost } from "../store/detailpage/actions";
import { selectPost } from "../store/detailpage/selectors";
import WeatherInfo from "../components/weatherInfo/WeatherInfo";
import LeafletMap from "../components/leafletMap";
import Mymap from "../components/leafletMap";
import { Container, Row, Col, Image, Card, CardDeck } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function DetailsPage() {
  const postData = useSelector(selectPost);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const {
    adress,
    imageUrl,
    latitude,
    longitude,
    title,
    description,
    userId,
  } = postData;

  useEffect(() => {
    dispatch(FetchPost(postId));
  }, []);
  // console.log("WHAT IS POST DATA?", postData);
  return (
    <Container className='detailpage-wrapper' fluid>
      <Row>
        <div className='detailpage-title'>{title}</div>
      </Row>
      <Row className='row-picture-and-description'>
        <Col md={8} className='details-image'>
          <Image src={imageUrl} alt='' fluid />
        </Col>
        <Col md={4} className='info-col'>
          <h4 className='info-col-title'>Why this is a must visit!</h4>
          <p className='description'>{description}</p>
          <FaMapMarkerAlt /> {adress}
        </Col>
      </Row>
      <Row>
        <Col className='map-col'>
          <Mymap
            latitude={latitude}
            longitude={longitude}
            adress={adress}
            id={postData.id}
          />
        </Col>
        <Col className='weather-col'>
          <WeatherInfo latitude={latitude} longitude={longitude} />
        </Col>
      </Row>
    </Container>
  );
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchPost } from "../store/detailpage/actions";
import { selectPost } from "../store/detailpage/selectors";
import WeatherInfo from "../components/weatherInfo/WeatherInfo";
import LeafletMap from "../components/leafletMap";
import Mymap from "../components/leafletMap";
import { Container, Row, Col, Image } from "react-bootstrap";

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
  console.log("WHAT IS POST DATA?", postData);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Image src={imageUrl} alt='' style={{ width: "100%" }} fluid />
        </Col>
      </Row>
      <Row>
        <Col md={5} style={{ border: "solid" }}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{adress}</p>
        </Col>
        <Col>
          <Mymap
            latitude={latitude}
            longitude={longitude}
            adress={adress}
            id={postData.id}
          />
        </Col>
      </Row>

      <WeatherInfo latitude={latitude} longitude={longitude} />
    </Container>
  );
}

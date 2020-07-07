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
  // console.log("WHAT IS POST DATA?", postData);
  return (
    <Container fluid>
      <Row style={{ backgroundClip: "border-box", border: "solid" }}>
        <Col>
          <Image src={imageUrl} alt='' style={{ width: "100%" }} fluid />
        </Col>
        <Col md={4}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{adress}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Mymap
            latitude={latitude}
            longitude={longitude}
            adress={adress}
            id={postData.id}
          />
        </Col>
        <Col>
          <WeatherInfo latitude={latitude} longitude={longitude} />
        </Col>
      </Row>
    </Container>
  );
}

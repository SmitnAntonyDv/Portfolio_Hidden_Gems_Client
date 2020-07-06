import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/homepage/Actions";
import { selectAllCountryInfo } from "../store/homepage/selectors";
import { Button, Container, Col, Row } from "react-bootstrap";

export default function Homepage() {
  const dispatch = useDispatch();
  const countryAndPostData = useSelector(selectAllCountryInfo);
  function renderData() {
    if (!countryAndPostData) {
      // console.log("no data");
      return <h2>Loading...</h2>;
    } else {
      // console.log("have data!");
      return (
        <>
          {countryAndPostData.map((item) => {
            return (
              <Row key={item.id}>
                <Col style={{ textAlign: "center" }} className='m-3'>
                  <Link to={`/locations/${item.id}/posts`}>
                    <Button
                      className='homePageButtons'
                      variant='primary'
                      size='lg'
                    >
                      {item.name}
                    </Button>
                  </Link>
                </Col>
              </Row>
            );
          })}
        </>
      );
    }
  }

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  return (
    <div>
      <div className='heroBanner'>
        <h1 className='hero-text'>What will you explore next?</h1>
      </div>
      <Container fluid>
        <span className='homepageButtonWrapper'>
          <div className='homepageButton'>{renderData()}</div>
        </span>
      </Container>
    </div>
  );
}

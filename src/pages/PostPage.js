import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { newPost } from "../store/newpost/actions";
import { selectUser } from "../store/user/selector";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adress, setAdress] = useState("");
  const [countryId, setCountryId] = useState(1);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitutde] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { token, id } = user;

  function submitForm(e) {
    e.preventDefault();

    dispatch(
      newPost(
        title,
        description,
        imageUrl,
        adress,
        token,
        id,
        countryId,
        latitude,
        longitude
      )
    );

    setTitle("");
    setDescription("");
    setImageUrl("");
  }

  function getUserLocationSuccess(pos) {
    setLatitude(pos.coords.latitude);
    setLongitutde(pos.coords.longitude);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getLocation() {
    console.log("CLICKED!");
    return navigator.geolocation.getCurrentPosition(
      getUserLocationSuccess,
      error
    );
  }
  console.log(latitude);
  console.log(longitude);
  return (
    <div>
      <Container>
        <h2>Please fill in all fields to share your post</h2>
        <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              placeholder='post title'
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              placeholder='describe your beautifull locations to other users'
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => setCountryId(e.target.value)}
              custom
            >
              <option value='1'>Indonesia</option>
              <option value='2'>Malaysia</option>
              <option value='3'>Thailand</option>
              <option value='4'>Singapore</option>
              <option value='5'>Vietnam</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label> Image </Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type='text'
              required
            />
          </Form.Group>

          <Form.Group controlId='formBasicCehckBox'>
            <Form.Check type='checkbox' label='Share location' required />
          </Form.Group>

          <button onClick={getLocation}>TESTING LOCATION GET</button>

          <Form.Group className='mt-5'>
            <Button variant='primary' type='submit' onClick={submitForm}>
              Share your beautifull location with the world!
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

import { selectUser } from "../store/user/selector";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adress, setAdress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitutde, setLongitutde] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { token, id } = user;

  function submitForm(e) {
    e.preventDefault();

    dispatch();

    setTitle("");
    setDescription("");
    setImageUrl("");
  }
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

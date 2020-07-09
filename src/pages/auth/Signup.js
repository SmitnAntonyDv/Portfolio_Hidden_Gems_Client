import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";

import { selectToken } from "../../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shareLocation, setShareLocation] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password, phoneNumber, shareLocation));

    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setName("");
  }

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);
  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='signup-title'>Signup</h1>
        <hr />
        <Form.Group controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type='text'
            placeholder='Enter name'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            placeholder='Enter email'
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            type='number'
            placeholder='Enter phone number'
          />
        </Form.Group>
        <Form.Check
          type='switch'
          onChange={(event) => setShareLocation(event.target.value)}
          id='custom-switch'
          label='Share Location when logged in'
        />
        <Form.Text className='text-muted'>
          Your location will ONLY be used for app functionality and NEVER shared
          with third-parties
        </Form.Text>
        <Form.Group className='submit-group'>
          <Button
            variant='primary'
            type='submit'
            onClick={submitForm}
            className='signup-submit-button'
          >
            Sign up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

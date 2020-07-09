import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { logingIn } from "../../store/user/actions";
import { selectToken } from "../../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    // console.log("Hello");
    event.preventDefault();

    console.log(email);
    console.log(password);
    dispatch(logingIn(email, password));

    setEmail("");
    setPassword("");
  }
  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='login-title'>Login</h1>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            placeholder='Enter email'
            required
          />
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
        <Form.Group className='mt-2'>
          <Button
            variant='primary'
            type='submit'
            onClick={submitForm}
            className='submit-button'
          >
            Log in
          </Button>
        </Form.Group>
        <div className='sign-up-link'>
          <Link to='/signup' style={{ textAlign: "center" }}>
            Join the community! Create an account
          </Link>
        </div>
      </Form>
    </Container>
  );
}

import React from "react";
import {
  FaFacebook,
  FaGooglePlusG,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Container className='main-footer' fluid>
      <Row>
        {/* Colum1 */}
        <div className='col-xs-12 col-sm-6 col-md-3'>
          <h4 className='footer-header'>About Us</h4>
          <ul className='list-unstyled'>
            <li>Head Office South-East Asia</li>
            <li>+65-992-5309-5</li>
            <li>Singapore</li>
            <li>Ang mo kio street 82-2</li>
          </ul>
        </div>
        {/* colum2 */}
        <div className='col-xs-12 col-sm-6 col-md-3'>
          <h4 className='footer-header'>Join Us</h4>
          <ul className='list-unstyled'>
            <li>
              <a className='fake-Link' href='#' onClick='return false;'>
                Explore positions
              </a>
            </li>
            <li className='fake-Link'>Management</li>
            <li className='fake-Link'>Company Trip</li>
          </ul>
        </div>
        {/* colum3 */}
        <div className='col-xs-12 col-sm-6 col-md-3'>
          <h4 className='footer-header'>Contact Info</h4>
          <ul className='list-unstyled'>
            <li>Head Office South-East Asia</li>
            <li>+65-992-5309-5</li>
            <li>Singapore</li>
            <li>10 Bayfront Ave, Singapore 018956</li>
          </ul>
        </div>
        {/* colum4 */}
        <div className='col-xs-12 col-sm-6 col-md-3'>
          <h4 className='footer-header'>Connect</h4>
          <div className='footer-social'>
            <ul className='Icons-horizontal-list-unstyled'>
              <li>
                <FaFacebook />
              </li>
              <li>
                <FaGooglePlusG />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaTwitter />
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <hr />
      <Row>
        <p className='col-sm'>
          &copy;2020 Hidden Gems Inc | all rights reserved | Terms of use |
          Privacy & cookies
        </p>
      </Row>
    </Container>
  );
}

import React from "react";

export default function Footer() {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='row'>
          {/* Colum1 */}
          <div className='col'>
            <h4>Logo</h4>
            <ul className='list-unstyled'>
              <li>
                Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget,
                imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices
                mauris. Integer ante arcu, accumsan a, consectetuer eget,
                posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper
                ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat
                pretium libero.
              </li>
            </ul>
          </div>
          {/* Colum2 */}
          <div className='col'>
            <h4>About Us</h4>
            <ul className='list-unstyled'>
              <li>Head Office South-East Asia</li>
              <li>+65-992-5309-5</li>
              <li>Singapore</li>
              <li>Ang mo kio street 82-2</li>
              <li>Head Office Europe.</li>
              <li>+44-782-5031-660</li>
              <li>London, United Kingdom</li>
              <li>10 Downing Street</li>
            </ul>
          </div>
          {/* colum2 */}
          <div className='col'>
            <h4>Join Us</h4>
            <ul className='list-unstyled'>
              <li>Discover your future with us</li>
              <li>Management</li>
              <li>Company Trips</li>
            </ul>
          </div>
          {/* colum3 */}
          <div className='col'>
            <h4>Connect with us</h4>
            <ul className='list-unstyled'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {/* colum4 */}
          <div className='col'>
            <h4>Connect with us</h4>
            <ul className='list-unstyled'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className='row'>
          <p className='col-sm'>
            &copy;{new Date().getFullYear} Hidden Gems Inc | all rights reserved
            | Terms of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

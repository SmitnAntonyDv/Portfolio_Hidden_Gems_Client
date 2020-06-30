import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div>
      I AM THE HOMEPAGE
      <h1>What are you exploring next?</h1>
      <div>
        <Link to={`/locations/${'1'}/posts`}>
          <button>Thailand</button>
        </Link>
        <Link to={`/locations/${'2'}/posts`}>
          <button>Indonesia</button>
        </Link>
        <Link to={`/locations/${'3'}/posts`}>
          <button>Vietnam</button>
        </Link>
        <Link to={`/locations/${'4'}/posts`}>
          <button>Singapore</button>
        </Link>
      </div>
    </div>
  );
}

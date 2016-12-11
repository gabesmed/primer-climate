import React from 'react';
import { IndexLink, Link } from 'react-router';

export default function PlayTabs() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <IndexLink
          activeClassName="active"
          className="nav-link"
          to={'/play'}>
          The Hot Seat
        </IndexLink>
      </li>
      <li className="nav-item">
        <Link
          activeClassName="active"
          className="nav-link"
          to={'/play/politics'}>
          Politics
        </Link>
      </li>
      <li className="nav-item">
        <Link
          activeClassName="active"
          className="nav-link"
          to={'/play/environment'}>
          Environment Forecast
        </Link>
      </li>
    </ul>
  );
}

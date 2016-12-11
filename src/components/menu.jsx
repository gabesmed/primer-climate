import React from 'react';
import { Link } from 'react-router';

export default function Menu() {
  return (
    <div>
      <div className="row-fluid">
        <h1>Play</h1>
      </div>
      <div className="row-fluid">
        <Link
          className="btn btn-primary btn-block"
          to={'/play'}>
          Play
        </Link>
      </div>
    </div>
  );
}

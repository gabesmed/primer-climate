import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import Scenario from '../../constants/scenario';
import PlayResults from '../../partials/play/results';
import LeverUtils from '../../utils/lever-utils';

export default function PlayHeader({ player, pathway, calc }) {
  if (!player) {
    return <div>null</div>;
  }

  // results
  const pathwayEncoded = LeverUtils.encode(pathway);
  const results = calc[pathwayEncoded];

  // display
  const startingYear = Scenario.startingYear;
  const numYears = Scenario.numYears;
  const allYears = _.range(startingYear, startingYear + numYears);
  const pastYears = allYears.slice(0, player.year);
  const futureYears = allYears.slice(player.year + 1);
  const currentYear = startingYear + player.year;

  const pastYearLinks = pastYears
    .map((year) => (
      <li key={year} className="nav-item">
        <span className="nav-link" href="#">{year}</span>
      </li>
    ));

  const futureYearLinks = futureYears
    .map((year) => (
      <li key={year} className="nav-item">
        <span className="nav-link disabled" href="#">{year}</span>
      </li>
    ));

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <ul className="nav nav-pills" style={{ overflow: 'hidden', height: '2.5em' }}>
            <li className="nav-item">
              <Link to={'/'} className="nav-link">&larr; back</Link>
            </li>
            {pastYearLinks}
            <li className="nav-item">
              <span className="nav-link active">{currentYear}</span>
            </li>
            {futureYearLinks}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2">
          <h6>Business</h6>
          Goodwill: {player.will}<br />
        </div>
        <div className="col-sm-2">
          something
        </div>
        <div className="col-sm-2">
          something
        </div>
        <div className="col-sm-6">
          <h6>The World in 2100</h6>
          <PlayResults
            pathway={pathway}
            results={results} />
        </div>
      </div>
    </div>
  );
}

PlayHeader.propTypes = {
  calc: React.PropTypes.object.isRequired,
  pathway: React.PropTypes.object.isRequired,
  player: React.PropTypes.object
};

import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import Descriptions from '../constants/descriptions.json';
import Levers from '../constants/levers';

export default function PlayLeverInfo({ params }) {
  const lever = _.find(Levers, ['name', params.leverName]);
  // const pageUrl = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${lever.num}/en`;

  const desc = Descriptions.descriptions[lever.num];
  // 0,
  // "Lever",
  // "Situation today",
  // "Interactions with other levers",
  // "One-pager context",
  // "Things to consider",
  // "1-pager Level 1"
  // "1-pager Level 2",
  // "1-pager Level 3",
  // "1-pager Level 4"
  const setting = 30;
  const onePager = desc[5 + Math.floor(setting / 10)];
  return (
    <div>
      <div>
        <Link to={`/play/${params.scenarioName}`}>&larr; Back</Link>
      </div>
      <p>{onePager}</p>
    </div>
  );
}

PlayLeverInfo.propTypes = {
  params: React.PropTypes.object.isRequired
};

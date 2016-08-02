import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import Descriptions from '../constants/descriptions.json';
import Levers from '../constants/levers';

export default function PlayLeverInfo({ params, leverSettings }) {
  const lever = _.find(Levers, ['name', params.leverName]);
  const pageUrl = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${lever.num}/en`;

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
  const setting = leverSettings[lever.name];
  const settingLevel = Math.floor(setting / 10) - 1;
  const levelDescs = [
    'Minimal action',
    'Some action',
    'Ambitious action',
    'Extreme action'
  ];
  const rows = levelDescs.map((title, i) => (
    <tr key={title} className={(i === settingLevel) ? 'bg-primary' : ''}>
      <td>{title}</td>
      <td>{desc[6 + i]}</td>
    </tr>
  ));
  const val = lever.value(setting - 10);
  const delta = lever.baseline > 0 ? 100 * ((val / lever.baseline) - 1) : 0;
  return (
    <div>
      <h2>
        <Link to={`/play/${params.scenarioName}/environment`}>
          Environment
        </Link> &rsaquo; {lever.title}
      </h2>
      <h4>
        <strong>In-game: </strong>
        {setting}/40 - {levelDescs[settingLevel]}<br />
        {val.toFixed(2)} {lever.unit} in 2050<br />
        {delta > 0 ? 'up' : 'down'} {Math.abs(delta).toFixed(2)}% from 2011
        ({lever.baseline} {lever.unit})
      </h4>
      <p><strong>Situation today:</strong> {desc[2]}</p>
      <table className="table table-sm table-bordered">
        <tbody>
        {rows}
        </tbody>
      </table>
      <p><strong>Context: </strong>{desc[4]}</p>
      <div>
        <a target="_blank" href={pageUrl}>More info on global calculator</a>
      </div>
    </div>
  );
}

PlayLeverInfo.propTypes = {
  params: React.PropTypes.object.isRequired,
  leverSettings: React.PropTypes.object.isRequired
};

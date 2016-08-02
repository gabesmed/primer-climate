import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

const ACTION_TABLE = [
  [10, 'minimal'],
  [20, 'ambitious'],
  [30, 'very ambitious'],
  [40, 'extremely ambitious']
];

export default function LeverOption({ lever, scenario, settings }) {
  let category = lever.name.split('.')[0];
  category = category[0].toUpperCase() + category.substring(1);
  const setting = settings[lever.name];
  const actionLevel = _.findLast(ACTION_TABLE, (i) => (
    i[0] <= setting
  ));
  const baseline = lever.baseline;
  const val = lever.value(setting - 10);
  const delta = baseline > 0 ? (100 * ((val / baseline) - 1)) : 0;
  const pct = 100 * (setting - 10) / 30;

  return (
    <div
      className="row" key={lever.name}
      style={{ borderTop: '1px solid #ccc', paddingTop: '5px' }}>
      <div className="col-sm-6">
        <p>
          <Link to={`/play/${scenario.name}/environment/${lever.name}`}>
            <strong>{lever.title}</strong>
          </Link>
          <br />
        {val.toFixed(2)} {lever.unit} in 2050<br />
        {delta > 0 ? 'up' : 'down'} {Math.abs(delta).toFixed(2)}% from 2011
        ({lever.baseline} {lever.unit})
        </p>
      </div>
      <div className="col-sm-6">
        <progress
          className="progress progress-striped"
          value={pct}
          style={{ marginBottom: 0 }}
          max="100">
          {setting - 10} action points ({actionLevel[1]}
        </progress>
      </div>
    </div>
  );
}

LeverOption.propTypes = {
  settings: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired,
  calc: React.PropTypes.object.isRequired,
  lever: React.PropTypes.object.isRequired
};

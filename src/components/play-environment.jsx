import _ from 'lodash';
import React from 'react';

import Levers from '../constants/levers';
import LeverOption from '../partials/play-environment/lever-option';

export default function PlayEnvironment({ calc, leverSettings, scenario }) {
  const leverOptions = scenario.levers.map((l) => {
    const lever = _.find(Levers, ['name', l.name]);
    return (<LeverOption
      key={l.name}
      lever={lever}
      scenario={scenario}
      settings={leverSettings}
      calc={calc} />);
  });
  return (
    <div className="row">
      <div className="col-sm-12">
        <h3>Projections for 2050</h3>
        <p>Progress bar is scale from minimal abatement to extreme action</p>
        {leverOptions}
      </div>
    </div>
  );
}

PlayEnvironment.propTypes = {
  calc: React.PropTypes.object.isRequired,
  leverSettings: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired
};

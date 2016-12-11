import _ from 'lodash';
import React from 'react';

import Scenario from '../constants/scenario';
import Levers from '../constants/levers';
import LeverOption from '../partials/play-environment/lever-option';

export default function PlayEnvironment({ calc, pathway }) {
  const leverOptions = Scenario.levers.map((l) => {
    const lever = _.find(Levers, ['name', l.name]);
    return (
      <LeverOption
        key={lever.name}
        lever={lever}
        pathway={pathway}
        calc={calc} />
    );
  });
  const otherLeverOptions = Levers
    .filter(lever => !_.find(Scenario.levers, ['name', lever.name]))
    .filter(lever => lever.hidden !== true)
    .map((lever => (
      <LeverOption
        key={lever.name}
        lever={lever}
        pathway={pathway}
        calc={calc} />
    )));
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h3>Projections for 2050</h3>
          <p>Progress bar is scale from minimal abatement to extreme action</p>
          {leverOptions}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h3>Context</h3>
          <p>These aspects are not part of this gameplay scenario.</p>
          {otherLeverOptions}
        </div>
      </div>
    </div>
  );
}

PlayEnvironment.propTypes = {
  calc: React.PropTypes.object.isRequired,
  pathway: React.PropTypes.object.isRequired
};

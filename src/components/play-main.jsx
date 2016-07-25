import React from 'react';

import LeverOptions from '../partials/play-main/lever-options';

export default function PlayMain({ calc, levers, scenario, onImproveLever, onFetchCalc }) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <LeverOptions
          calc={calc}
          settings={levers}
          scenario={scenario}
          onImproveLever={onImproveLever}
          onFetchCalc={onFetchCalc}
        />
      </div>
    </div>
  );
}

PlayMain.propTypes = {
  calc: React.PropTypes.object.isRequired,
  levers: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired,
  onImproveLever: React.PropTypes.func.isRequired,
  onFetchCalc: React.PropTypes.func.isRequired
};

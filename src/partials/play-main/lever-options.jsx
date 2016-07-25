import _ from 'lodash';
import React from 'react';

import Levers from '../../constants/levers';
import LeverOption from './lever-option';

export default function LeverOptions({
    scenario, settings, calc,
    onImproveLever, onFetchCalc }) {
  const rows = Levers
    .filter((lever) => (
      // Is it in the levers obj
      _.includes(scenario.leverNames, lever.name)
    ))
    .map((lever) => (
      <LeverOption
        key={lever.name}
        lever={lever}
        scenario={scenario}
        settings={settings}
        calc={calc}
        onImproveLever={onImproveLever}
        onFetchCalc={onFetchCalc}
      />
    ));
  return (
    <div>
      {rows}
    </div>
  );
}

LeverOptions.propTypes = {
  calc: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired,
  onImproveLever: React.PropTypes.func.isRequired,
  onFetchCalc: React.PropTypes.func.isRequired
};

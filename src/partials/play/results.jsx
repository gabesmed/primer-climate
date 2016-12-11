import React from 'react';

import LeverUtils from '../../utils/lever-utils';

export default function PlayResults({ pathway, results }) {
  if (!results) {
    return <div>No results.</div>;
  }
  if (results.state === 'requested') {
    return <div>Loading...<br />&nbsp;<br />&nbsp;</div>;
  }
  const data = results.data;
  const emissions = data.cumulativeEmissions.toFixed(1);
  let estimate;
  if (typeof data.lowEstimate === 'number') {
    estimate = `
      ${data.lowEstimate.toFixed(2)}°C–${data.highEstimate.toFixed(2)}°C`;
  } else {
    estimate = 'Catastrophic warming';
  }
  const pathwayEncoded = LeverUtils.encode(pathway);
  return (
    <div>
      <div>Cumulative Emissions: {emissions} Gigatons</div>
      <div>Global Mean Temp: {estimate}</div>
      <div><a href={`http://tool.globalcalculator.org/globcalc.html?levers=${pathwayEncoded}/dashboard/en`}>
        Open scenario in calculator
      </a>
      </div>
    </div>
  );
}

PlayResults.propTypes = {
  pathway: React.PropTypes.object,
  results: React.PropTypes.object
};

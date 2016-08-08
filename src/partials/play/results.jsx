import React from 'react';

export default function PlayResults({ encoded, results }) {
  if (!results) {
    return <div>No results.</div>;
  }
  if (results.state === 'requested') {
    return <div>Loading...</div>;
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
  return (
    <div>
      <div>Cumulative Emissions: {emissions} Gigatons</div>
      <div>Global Mean Temp: {estimate}</div>
      <div><a href={`http://tool.globalcalculator.org/globcalc.html?levers=${encoded}/dashboard/en`}>
        Open scenario in calculator
      </a>
      </div>
    </div>
  );
}

PlayResults.propTypes = {
  encoded: React.PropTypes.string,
  results: React.PropTypes.object
};

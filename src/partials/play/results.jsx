import React from 'react';

export default function PlayResults({ results }) {
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
      <h4>The World in 2100</h4>
      <div>Cumulative Emissions: {emissions} Gigatons</div>
      <div>Global Mean Temp: {estimate}</div>
    </div>
  );
}

PlayResults.propTypes = {
  results: React.PropTypes.object
};

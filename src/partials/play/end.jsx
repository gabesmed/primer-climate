import React from 'react';

export default function PlayEnd({ onStartScenario }) {
  return (
    <div>
      <div className="row-fluid">
        <h1>Game over</h1>
        <p>Results...</p>
      </div>
      <div className="row-fluid">
        <button
          className="btn btn-primary btn-block"
          onClick={onStartScenario}>
          Restart
        </button>
      </div>
    </div>
  );
}

PlayEnd.propTypes = {
  onStartScenario: React.PropTypes.func.isRequired
};

import _ from 'lodash';
import React from 'react';

import Levers from '../../constants/levers';

function renderChoice(event, choice, i, onRespondToEvent) {
  const willDelta = (choice.will >= 0 ? '+' : '') + choice.will;
  const leverDescs = _.map(choice.deltas || {}, (v, k) => {
    const leverDelta = (v >= 0 ? '+' : '') + v;
    const lever = _.find(Levers, ['name', k]);
    return `${leverDelta} ${lever.title}`;
  }).join('<br />');
  return (
    <div className="card" key={i}>
      <h6 className="card-header">
        {choice.title}
      </h6>
      <div className="card-block">
        <p className="card-text">
          {willDelta} Goodwill
          {leverDescs ? <br /> : ''}
          {leverDescs}
        </p>
        <button
          key={i}
          className="btn btn-secondary btn-block"
          onClick={() => onRespondToEvent(event, i)}
          style={{ overflow: 'hidden' }}>
          Choose
        </button>
      </div>
    </div>
  );
}

export default function PlayHotseatEvent({ event, onRespondToEvent }) {
  const choices = (event.choices || []).map((choice, i) => (
    renderChoice(event, choice, i, onRespondToEvent)));

  return (
    <div>
      <h4>{event.title}</h4>
      <p>{event.desc}</p>

      <div className="card-group">
        {choices}
      </div>
    </div>
  );
}

PlayHotseatEvent.propTypes = {
  event: React.PropTypes.object.isRequired,
  onRespondToEvent: React.PropTypes.func.isRequired
};

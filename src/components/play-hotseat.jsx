import React from 'react';

import Scenario from '../constants/scenario';
import PlayHotseatEvent from '../partials/play-hotseat/event';
import Events from '../constants/events.json';

function renderEvent(event, onRespondToEvent) {
  return (
    <PlayHotseatEvent
      event={event}
      onRespondToEvent={onRespondToEvent} />
  );
}

function renderNoEvents(player, onNextYear) {
  const currentYear = Scenario.startingYear + player.year;
  const nextYear = currentYear + 1;
  return (
    <div>
      <h4>Year over</h4>
      <button
        className="btn btn-primary btn-block"
        onClick={onNextYear}>
        Proceed to {nextYear}
      </button>
    </div>
  );
}

function renderInterface(player, onRespondToEvent, onNextYear) {
  const eventNum = player.cards[0];
  const event = Events[eventNum];
  if (event) {
    return renderEvent(event, onRespondToEvent);
  }
  return renderNoEvents(player, onNextYear);
}

export default function PlayHotseat({ player, onRespondToEvent, onNextYear }) {
  const ui = renderInterface(player, onRespondToEvent, onNextYear);
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          {ui}
        </div>
      </div>
    </div>
  );
}

PlayHotseat.propTypes = {
  player: React.PropTypes.object.isRequired,
  onRespondToEvent: React.PropTypes.func.isRequired,
  onNextYear: React.PropTypes.func.isRequired
};

import _ from 'lodash';

import Scenario from '../constants/scenario';
import Events from '../constants/events.json';
import Levers from '../constants/levers';
import LeverUtils from '../utils/lever-utils';

const initialState = {
  player: {
    will: 100,
    year: 0,
    cards: []
  },
  pathway: LeverUtils.decode(Scenario.startingPathway)
};

function playReducer(state = initialState, action) {
  switch (action.type) {
    case 'startScenario': {
      return _.assign({}, initialState, {
        player: _.assign({}, initialState.player, {
          cards: [Math.floor(Math.random() * Events.length)]
        })
      });
    }
    case 'respondToEvent': {
      const pathway = state.pathway;
      const choice = action.event.choices[action.choiceIndex];
      _.forOwn(choice.deltas, (v, k) => {
        const lever = _.find(Levers, ['name', k]);
        pathway[k] = Math.min(pathway[k] + v, (lever.max || 4) * 10);
      });
      return _.assign({}, state, {
        pathway: pathway,
        player: _.assign({}, state.player, {
          will: state.player.will + (choice.will || 0),
          cards: []
        })
      });
    }
    case 'nextYear': {
      return _.assign({}, state, {
        player: _.assign({}, state.player, {
          will: state.player.will + 10,
          year: state.player.year + 1,
          cards: [Math.floor(Math.random() * Events.length)]
        })
      });
    }
    default: {
      return state;
    }
  }
}

export default playReducer;

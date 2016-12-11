import { connect } from 'react-redux';

import { fetchCalcIfNeeded } from './actions/calc';
import { startScenario, nextYear, respondToEvent } from './actions/play';

const mapStateToProps = (state) => ({
  calc: state.calc,
  pathway: state.play.pathway,
  player: state.play.player,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({
  onStartScenario: (scenarioName) => {
    dispatch(startScenario(scenarioName));
  },
  onNextYear: () => {
    dispatch(nextYear());
  },
  onFetchCalc: (encoded) => {
    dispatch(fetchCalcIfNeeded(encoded));
  },
  onRespondToEvent: (event, choiceIndex) => {
    dispatch(respondToEvent(event, choiceIndex));
  }
});

export default (component) => (
  connect(mapStateToProps, mapDispatchToProps)(component)
);

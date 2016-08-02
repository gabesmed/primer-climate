import { connect } from 'react-redux';

import { fetchCalcIfNeeded } from '../actions/calc';
import { startScenario, nextYear } from '../actions/play';
import Play from '../components/play';

const mapStateToProps = (state) => ({
  calc: state.calc,
  leverSettingsEncoded: state.play.leverSettingsEncoded,
  leverSettings: state.play.leverSettings,
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
  }
});

const PlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);

export default PlayContainer;

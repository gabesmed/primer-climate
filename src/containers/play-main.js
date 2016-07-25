import { connect } from 'react-redux';

import { fetchCalcIfNeeded } from '../actions/calc';
import { improveLever } from '../actions/play';
import PlayMain from '../components/play-main';

const mapStateToProps = (state) => ({
  calc: state.calc,
  encoded: state.play.encoded,
  levers: state.play.levers,
  player: state.play.player,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({
  onImproveLever: (leverName) => {
    dispatch(improveLever(leverName));
  },
  onFetchCalc: (encoded) => {
    dispatch(fetchCalcIfNeeded(encoded));
  }
});

const PlayMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMain);

export default PlayMainContainer;

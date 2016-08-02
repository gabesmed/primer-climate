import { connect } from 'react-redux';

import PlayLeverInfo from '../components/play-lever-info';

const mapStateToProps = (state) => ({
  leverSettings: state.play.leverSettings,
  player: state.play.player,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({});

const PlayLeverInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayLeverInfo);

export default PlayLeverInfoContainer;

import { connect } from 'react-redux';

import PlayEnvironment from '../components/play-environment';

const mapStateToProps = (state) => ({
  calc: state.calc,
  leverSettingsEncoded: state.play.leverSettingsEncoded,
  leverSettings: state.play.leverSettings,
  player: state.play.player,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({});

const PlayEnvironmentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayEnvironment);

export default PlayEnvironmentContainer;

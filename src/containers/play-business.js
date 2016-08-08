import { connect } from 'react-redux';

import PlayBusiness from '../components/play-business';

const mapStateToProps = (state) => ({
  player: state.play.player,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({});

const PlayBusinessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBusiness);

export default PlayBusinessContainer;

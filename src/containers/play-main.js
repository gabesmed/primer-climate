import { connect } from 'react-redux'

import { fetchCalcIfNeeded } from '../actions/calc'
import { startScenario, improveLever } from '../actions/play'
import PlayMain from '../components/play-main'

const mapStateToProps = (state) => {
  return {
    calc: state.calc,
    encoded: state.play.encoded,
    levers: state.play.levers,
    player: state.play.player,
    scenario: state.play.scenario
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onImproveLever: (leverName) => {
      dispatch(improveLever(leverName))
    },
    onFetchCalc: (encoded) => {
      dispatch(fetchCalcIfNeeded(encoded))
    }
  }
}

const PlayMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMain)

export default PlayMainContainer

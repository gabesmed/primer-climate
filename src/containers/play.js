import { connect } from 'react-redux'

import { fetchCalcIfNeeded } from '../actions/calc'
import { startScenario, improveLever } from '../actions/play'
import Play from '../components/play'

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
    onStartScenario: (scenarioName) => {
      dispatch(startScenario(scenarioName))
    },
    onImproveLever: (leverName) => {
      dispatch(improveLever(leverName))
    },
    onFetchCalc: (encoded) => {
      dispatch(fetchCalcIfNeeded(encoded))
    }
  }
}

const PlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)

export default PlayContainer

import _ from 'lodash'

import Scenarios from '../constants/scenarios'
import StockPathways from '../constants/stock-pathways'
import LeverUtils from '../utils/lever-utils'

const initialState = {
  scenario: null,
  player: null,
  levers: null,
  encoded: null
}

function getStartingPlayer(scenario) {
  const player = _.assign({production: {}}, scenario.startingPlayer)
  scenario.products.forEach((product) => {
    player.production[product.name] = {
      production: 0
    }
  })
  return player
}

function playReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_SCENARIO':
      const rcp85 = _.find(StockPathways, ['title', 'RCP 8.5'])
      const scenario = _.find(Scenarios, ['name', action.scenarioName])
      const player = getStartingPlayer(scenario)
      return {
        scenario: scenario,
        player: player,
        encoded: rcp85.encoded,
        levers: LeverUtils.decode(rcp85.encoded)
      }
    case 'IMPROVE_LEVER':
      const levers = _.assign({}, state.levers, {
        [action.leverName]: state.levers[action.leverName] + 1
      })
      const encoded = LeverUtils.encode(levers)
      return _.assign({}, state, {
        levers: levers,
        encoded: encoded,
        player: _.assign({}, state.player, {
          money: state.player.money - 100
        })
      })
    default:
      return state
  }
}

export default playReducer

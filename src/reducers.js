import { combineReducers } from 'redux'

import calcReducer from './reducers/calc'
import playReducer from './reducers/play'

export default combineReducers({
  calc: calcReducer,
  play: playReducer
})

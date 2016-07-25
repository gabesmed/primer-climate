import _ from 'lodash';

const initialState = {};

function calcReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CALC':
      // Don't request again if it's already in progress
      if (state[action.encoded]) {
        console.warn(
          `Tried to request ${action.encoded} when already requested`);
      }
      return _.assign({}, state, {
        [action.encoded]: {
          state: 'requested',
          data: null
        }
      });
    case 'RECEIVE_CALC':
      return _.assign({}, state, {
        [action.encoded]: {
          state: 'received',
          data: action.result
        }
      });
    default:
      return state;
  }
}

export default calcReducer;

import 'whatwg-fetch';

function requestCalc(encoded) {
  return { type: 'REQUEST_CALC', encoded: encoded };
}

function receiveCalc(encoded, result) {
  return {
    type: 'RECEIVE_CALC',
    encoded: encoded,
    result: result
  };
}

function processResponse(data) {
  return {
    lowEstimate: data[0].dashboard['temperature change Low'][1],
    highEstimate: data[0].dashboard['temperature change High'][1],
    cumulativeEmissions: data[0].dashboard['cum GHG emissions projected'][1]
  };
}

function shouldFetchCalc(state, encoded) {
  if (!encoded || encoded.length !== 59) {
    throw new Error(`Invalid calc request ${encoded}`);
  }
  return !state[encoded];
}

function fetchCalc(encoded) {
  return function (dispatch) {
    dispatch(requestCalc(encoded));

    fetch(`/calc/${encoded}`)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveCalc(encoded, processResponse(data)));
      })
      .catch(err => {
        console.trace(err);
      });
  };
}

export function fetchCalcIfNeeded(encoded) {
  return function (dispatch, getState) {
    if (shouldFetchCalc(getState().calc, encoded)) {
      return dispatch(fetchCalc(encoded));
    }
    return Promise.resolve();
  };
}

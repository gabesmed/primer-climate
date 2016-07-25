export function startScenario(scenarioName) {
  return { type: 'START_SCENARIO', scenarioName: scenarioName };
}

export function improveLever(leverName) {
  return { type: 'IMPROVE_LEVER', leverName: leverName };
}

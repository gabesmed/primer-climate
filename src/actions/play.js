export function startScenario(scenarioName) {
  return { type: 'START_SCENARIO', scenarioName: scenarioName };
}

export function selectBudgetOption(index) {
  return { type: 'SELECT_BUDGET_OPTION', index: index };
}

export function nextYear() {
  return { type: 'NEXT_YEAR' };
}

export function startScenario() {
  return { type: 'startScenario' };
}

export function respondToEvent(event, choiceIndex) {
  return { type: 'respondToEvent', event: event, choiceIndex: choiceIndex };
}

export function nextYear() {
  return { type: 'nextYear' };
}

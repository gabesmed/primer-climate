import _ from 'lodash';

import Scenarios from '../constants/scenarios';
import LeverUtils from '../utils/lever-utils';

const initialState = {
  scenario: null,
  player: null,
  budget: null,
  history: null,
  leverSettings: null,
  leverSettingsEncoded: null,
  budgetSettings: null,
  budgetSettingsEncoded: null
};

function getStartingPlayer(scenario) {
  const player = _.assign({
    products: scenario.products.map((product) => (_.assign({
    }, product))),
    year: 0
  }, scenario.startingPlayer);
  return player;
}

function getNewBudget(scenario, year) {
  return scenario.budgetOptions.map((opt) => ({
    isSelected: false,
    values: _.assign({}, opt)
  }));
}

function getHistoryEntryFromPlayer() {
  return {};
}

function getSettingsForBudget(currentSettings, budget) {
  const budgetSettings = _.assign({}, currentSettings);
  const selected = _.filter(budget, 'isSelected');
  const withLevers = _.filter(selected, 'values.leverName');
  withLevers
    .forEach((option) => {
      const values = option.values;
      budgetSettings[values.leverName] += values.leverDelta;
    });
  return budgetSettings;
}

function playReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_SCENARIO': {
      const scenario = _.find(Scenarios, ['name', action.scenarioName]);
      const player = getStartingPlayer(scenario);
      const budget = getNewBudget(scenario, 0);
      const settingsEncoded = scenario.startingPathway;
      const settings = LeverUtils.decode(settingsEncoded);
      const initialHistory = getHistoryEntryFromPlayer(player);
      return {
        scenario: scenario,
        player: player,
        budget: budget,
        history: [initialHistory],
        leverSettingsEncoded: settingsEncoded,
        leverSettings: settings,
        budgetSettingsEncoded: settingsEncoded,
        budgetSettings: settings
      };
    }
    case 'SELECT_BUDGET_OPTION': {
      const newBudget = [].concat(state.budget);
      newBudget[action.index].isSelected = !newBudget[action.index].isSelected;
      const budgetSettings = getSettingsForBudget(
        state.leverSettings, newBudget);
      return _.assign({}, state, {
        budget: newBudget,
        budgetSettings: budgetSettings,
        budgetSettingsEncoded: LeverUtils.encode(budgetSettings)
      });
    }
    case 'NEXT_YEAR': {
      let newMoney = state.player.money;
      let newNumEmployees = state.player.numEmployees;

      // subtract cash for existing employees
      newMoney -= state.player.numEmployees * state.player.employeeSalary;

      // add new employees and subtract cash for budget options
      state.budget.forEach((budgetOption) => {
        if (budgetOption.isSelected) {
          newMoney -= budgetOption.values.cost;
          newNumEmployees += (budgetOption.values.employeeDelta || 0);
        }
      });
      const newBudget = getNewBudget(state.scenario);
      const newPlayer = _.assign({}, state.player, {
        year: state.player.year + 1,
        money: newMoney,
        numEmployees: newNumEmployees
      });
      const latestHistory = getHistoryEntryFromPlayer(newPlayer);
      const newHistory = [].concat(state.history, [latestHistory]);
      return _.assign({}, state, {
        player: newPlayer,
        budget: newBudget,
        history: newHistory,
        // Apply budgeted settings to current
        leverSettings: state.budgetSettings,
        leverSettingsEncoded: state.budgetSettingsEncoded
      });
    }
    default: {
      return state;
    }
  }
}

export default playReducer;

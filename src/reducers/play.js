import _ from 'lodash';

import Scenarios from '../constants/scenarios';
import StockPathways from '../constants/stock-pathways';
import LeverUtils from '../utils/lever-utils';

const initialState = {
  scenario: null,
  player: null,
  budget: null,
  leverSettings: null,
  leverSettingsEncoded: null,
  budgetSettings: null,
  budgetSettingsEncoded: null
};

function getStartingPlayer(scenario) {
  const player = _.assign({
    production: {},
    year: 0
  }, scenario.startingPlayer);
  scenario.products.forEach((product) => {
    player.production[product.name] = {
      production: 0
    };
  });
  return player;
}

function getNewBudget(scenario, year) {
  return scenario.budgetOptions.map((opt) => ({
    isSelected: false,
    values: _.assign({}, opt)
  }));
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
      const rcp85 = _.find(StockPathways, ['title', 'RCP 8.5']);
      const scenario = _.find(Scenarios, ['name', action.scenarioName]);
      const player = getStartingPlayer(scenario);
      const budget = getNewBudget(scenario, 0);
      const settingsEncoded = rcp85.encoded;
      const settings = LeverUtils.decode(rcp85.encoded);
      return {
        scenario: scenario,
        player: player,
        budget: budget,
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
      state.budget.forEach((budgetOption) => {
        if (budgetOption.isSelected) {
          newMoney -= budgetOption.values.cost;
        }
      });
      const newBudget = getNewBudget(state.scenario);
      const newPlayer = _.assign({}, state.player, {
        year: state.player.year + 1,
        money: newMoney
      });
      return _.assign({}, state, {
        player: newPlayer,
        budget: newBudget,
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

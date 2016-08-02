import _ from 'lodash';
import React, { Component } from 'react';

import BudgetOption from '../partials/play-budget/budget-option';

export default class PlayBudget extends Component {
  constructor(props) {
    super(props);
    this.handleToggleBudgetOption = this.handleToggleBudgetOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.onFetchCalc(nextProps.budgetSettingsEncoded);
  }

  handleToggleBudgetOption(budgetOptionIndex) {
    this.props.onSelectBudgetOption(budgetOptionIndex);
  }

  render() {
    const budget = this.props.budget || [];
    const selectedOpts = _.filter(budget, 'isSelected');

    const budgetTotal = this.props.player.money;
    const budgetUsed = _.sumBy(selectedOpts, 'values.cost');
    const budgetAvailable = budgetTotal - budgetUsed;

    const budgetOptions = budget.map((option, i) => (
      <BudgetOption
        key={option.values.leverName}
        isSelected={option.isSelected}
        budgetAvailable={budgetAvailable}
        calc={this.props.calc}
        leverSettings={this.props.leverSettings}
        leverSettingsEncoded={this.props.leverSettingsEncoded}
        scenario={this.props.scenario}
        onFetchCalc={this.props.onFetchCalc}
        onToggle={() => this.handleToggleBudgetOption(i)}
        values={option.values} />
      )
    );

    const curEncoded = this.props.leverSettingsEncoded;
    const curCalc = _.get(this.props.calc[curEncoded], 'data');
    const budgetedEncoded = this.props.budgetSettingsEncoded;
    const budgetCalc = _.get(this.props.calc[budgetedEncoded], 'data');
    let budgetDiff = '...';
    if (curCalc && budgetCalc) {
      const curEmissions = curCalc.cumulativeEmissions;
      const budgetEmissions = budgetCalc.cumulativeEmissions;
      const diffEmissions = budgetEmissions - curEmissions;
      const diffSign = diffEmissions > 0 ? '+' : '-';
      budgetDiff = `${diffSign}${Math.abs(diffEmissions).toFixed(2)} Gtn`;
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            Budget total: ${budgetTotal}<br />
            Budget available: ${budgetAvailable}
          </div>
          <div className="col-sm-6">
            Budget spent: ${budgetUsed}<br />
            Emissions: {budgetDiff}
          </div>
        </div>
        <div className="budget-option-rows">
          {budgetOptions}
        </div>
      </div>
    );
  }
}

PlayBudget.propTypes = {
  calc: React.PropTypes.object.isRequired,
  player: React.PropTypes.object.isRequired,
  budget: React.PropTypes.array.isRequired,
  budgetSettings: React.PropTypes.object.isRequired,
  budgetSettingsEncoded: React.PropTypes.string.isRequired,
  scenario: React.PropTypes.object.isRequired,
  leverSettings: React.PropTypes.object.isRequired,
  leverSettingsEncoded: React.PropTypes.string.isRequired,
  onFetchCalc: React.PropTypes.func.isRequired,
  onSelectBudgetOption: React.PropTypes.func.isRequired
};

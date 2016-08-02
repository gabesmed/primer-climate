import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';

import Levers from '../../constants/levers';
import LeverUtils from '../../utils/lever-utils';

export default class BudgetOption extends Component {

  componentDidMount() {
    // Pre-seed calc after mounting
    this.getProspectiveCalc();
  }

  componentDidUpdate(prevProps, prevState) {
    // Pre-seed calc after updating
    this.getProspectiveCalc();
  }

  getProspectiveSettings() {
    const curSetting = this.props.leverSettings[this.props.values.leverName];
    const nextSetting = curSetting + this.props.values.leverDelta;
    return _.assign({}, this.props.leverSettings, {
      [this.props.values.leverName]: nextSetting
    });
  }

  getProspectiveCalc() {
    const nextEncoded = LeverUtils.encode(this.getProspectiveSettings());
    if (!this.props.calc[nextEncoded]) {
      this.props.onFetchCalc(nextEncoded);
      return null;
    }
    return null;
  }

  render() {
    let disabled = false;
    let buttonTitle = '';
    if (this.props.isSelected) {
      buttonTitle = 'Deselect';
    } else if (this.props.values.cost > this.props.budgetAvailable) {
      buttonTitle = 'Too expensive';
      disabled = true;
    } else if (this.props.values.leverName &&
      this.props.leverSettings[this.props.values.leverName] === 40) {
      buttonTitle = 'At max';
      disabled = true;
    } else {
      buttonTitle = 'Purchase';
    }
    const button = (
      <button
        className="btn btn-block btn-secondary"
        disabled={disabled}
        onClick={this.props.onToggle}>
        {buttonTitle}
      </button>
    );
    const cardClassName = this.props.isSelected ? 'card card-info' : 'card';

    const effects = [['Cost', `$${this.props.values.cost}`]];

    if (this.props.values.leverName) {
      const lever = _.find(Levers, ['name', this.props.values.leverName]);
      const scenarioLever = _.find(this.props.scenario.levers,
        ['name', lever.name]);
      const leverUrl = `/play/${this.props.scenario.name}/environment/${lever.name}`;
      const leverLink = <Link to={leverUrl}>{lever.title}</Link>;
      const curEncoded = this.props.leverSettingsEncoded;
      const curCalc = _.get(this.props.calc[curEncoded], 'data');
      const nextSettings = this.getProspectiveSettings();
      const nextEncoded = LeverUtils.encode(nextSettings);
      const nextCalc = _.get(this.props.calc[nextEncoded], 'data');
      let leverEffect = 'Calculating...';
      if (nextCalc) {
        const curSetting = this.props.leverSettings[lever.name];
        const curValue = lever.value(curSetting - 10);
        const curScaled = (curValue *
          (scenarioLever.scaling || 1) /
          (scenarioLever.unitScale || 1));
        const unit = scenarioLever.unit || lever.unit;
        const nextSetting = nextSettings[lever.name];
        const nextValue = lever.value(nextSetting - 10);
        const nextScaled = (nextValue *
          (scenarioLever.scaling || 1) /
          (scenarioLever.unitScale || 1));

        leverEffect = `To ${nextScaled.toFixed(2)} ${unit} (from ${curScaled.toFixed(2)})`;
      }
      effects.push([leverLink, leverEffect]);
      if (curCalc && nextCalc) {
        const curEmissions = curCalc.cumulativeEmissions;
        const nextEmissions = nextCalc.cumulativeEmissions;
        const diff = nextEmissions - curEmissions;
        const dir = diff > 0 ? '+' : '-';
        effects.push(['Emissions', `${dir}${Math.abs(diff).toFixed(2)} GTn`]);
      }
    }

    const effectsList = effects.map((effect, i) => (
      <span key={i}>
        <strong>{effect[0]}:</strong> {effect[1]}
        <br />
      </span>
    ));

    return (
      <div key={this.props.values.leverName} className={cardClassName}>
        <div className="card-header">
          {this.props.values.title}
        </div>
        <div className="card-block">
          <p className="card-text">
            {effectsList}
          </p>
          {button}
        </div>
      </div>
    );
  }
}

BudgetOption.propTypes = {
  budgetAvailable: React.PropTypes.number.isRequired,
  calc: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  leverSettings: React.PropTypes.object.isRequired,
  leverSettingsEncoded: React.PropTypes.string.isRequired,
  scenario: React.PropTypes.object.isRequired,
  onFetchCalc: React.PropTypes.func.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  values: React.PropTypes.object.isRequired
};

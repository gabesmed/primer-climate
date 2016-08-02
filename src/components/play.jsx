import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

import PlayResults from '../partials/play/results';

export default class Play extends Component {

  constructor(props) {
    super(props);
    this.handleNextYearClick = this.handleNextYearClick.bind(this);
  }

  componentDidMount() {
    this.props.onStartScenario(this.props.params.scenarioName);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.onFetchCalc(nextProps.leverSettingsEncoded);
  }

  handleNextYearClick() {
    this.props.onNextYear();
  }

  render() {
    if (!this.props.player || !this.props.scenario) {
      return <div>null</div>;
    }

    // results
    const results = this.props.calc[this.props.leverSettingsEncoded];

    // display
    const startingYear = this.props.scenario.startingYear;
    const yearNum = this.props.player.year + 1;
    const currentYear = startingYear + this.props.player.year;
    const numYears = this.props.scenario.numYears;
    const nextYear = currentYear + 1;

    const products = this.props.scenario.products.map((product) => {
      const production = this.props.player.production[product.name];
      return (
        <div key={product.name}>
          {product.title}: {production.production}/year
        </div>
      );
    });
    return (
      <div>
        <div>
          <Link to={'/'}>&larr; back</Link>
        </div>
        <div className="row">
          <div className="col-sm-6">
            Year: {currentYear} ({yearNum}/{numYears})<br />
            Money: ${this.props.player.money}<br />
            Brand: {this.props.player.brand}<br />
            Employees: {this.props.player.employees}
            {products}
          </div>
          <div className="col-sm-6">
            <PlayResults
              leverSettingsEncoded={this.props.leverSettingsEncoded}
              results={results} />
          </div>
        </div>

        <div className="pull-xs-right">
          <button
            className="btn btn-primary"
            onClick={this.handleNextYearClick}>
            Proceed to {nextYear}
          </button>
        </div>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <IndexLink
              activeClassName="active"
              className="nav-link"
              to={`/play/${this.props.params.scenarioName}`}>
              Budget
            </IndexLink>
          </li>
          <li className="nav-item">
            <Link
              activeClassName="active"
              className="nav-link"
              to={`/play/${this.props.params.scenarioName}/business`}>
              Business Forecast
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClassName="active"
              className="nav-link"
              to={`/play/${this.props.params.scenarioName}/environment`}>
              Environment Forecast
            </Link>
          </li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}

Play.propTypes = {
  calc: React.PropTypes.object.isRequired,
  leverSettingsEncoded: React.PropTypes.string,
  onStartScenario: React.PropTypes.func.isRequired,
  onNextYear: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  player: React.PropTypes.object,
  scenario: React.PropTypes.object,
  children: React.PropTypes.node.isRequired
};

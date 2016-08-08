import _ from 'lodash';
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
    const numYears = this.props.scenario.numYears;
    const allYears = _.range(startingYear, startingYear + numYears);
    const pastYears = allYears.slice(0, this.props.player.year);
    const futureYears = allYears.slice(this.props.player.year + 1);
    const currentYear = startingYear + this.props.player.year;
    const nextYear = currentYear + 1;

    const pastYearLinks = pastYears
      .map((year) => (
        <li key={year} className="nav-item">
          <span className="nav-link" href="#">{year}</span>
        </li>
      ));

    const futureYearLinks = futureYears
      .map((year) => (
        <li key={year} className="nav-item">
          <span className="nav-link disabled" href="#">{year}</span>
        </li>
      ));

    const production = this.props.player.products
      .filter(product => product.isActive)
      .map((product) => (
        <div key={product.name}>
          {product.title}: {product.productionPerYear}
        </div>
      ));

    const demand = this.props.player.products
      .filter(product => product.isActive)
      .map((product) => (
        <div key={product.name}>
          {product.title}: {product.demandPerYear}
        </div>
      ));

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-pills" style={{ overflow: 'hidden', height: '2.5em' }}>
              <li className="nav-item">
                <Link to={'/'} className="nav-link">&larr; back</Link>
              </li>
              {pastYearLinks}
              <li className="nav-item">
                <span className="nav-link active">{currentYear}</span>
              </li>
              {futureYearLinks}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <h6>Business</h6>
            Money: ${this.props.player.money}<br />
            Brand: {this.props.player.brand}%<br />
            Employees: {this.props.player.numEmployees}
          </div>
          <div className="col-sm-2">
            <h6>Production/year</h6>
            {production}
          </div>
          <div className="col-sm-2">
            <h6>Demand/year</h6>
            {demand}
          </div>
          <div className="col-sm-6">
            <h6>The World in 2100</h6>
            <PlayResults
              leverSettingsEncoded={this.props.leverSettingsEncoded}
              results={results} />
          </div>
        </div>
        <br />

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
        <br />
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

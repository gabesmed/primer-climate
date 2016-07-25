import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';

import LeverUtils from '../../utils/lever-utils';

const ACTION_TABLE = [
  [10, 'minimal'],
  [20, 'ambitious'],
  [30, 'very ambitious'],
  [40, 'extremely ambitious']
];

function encodeNext(settings, key) {
  const curSetting = settings[key];
  // Check max
  if (curSetting >= 40) {
    return null;
  }
  const nextSettings = _.assign({}, settings, {
    [key]: curSetting + 1
  });
  return LeverUtils.encode(nextSettings);
}

export default class LeverOption extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCalc();
  }

  componentDidUpdate() {
    this.fetchCalc();
  }

  getSetting() {
    return this.props.settings[this.props.lever.name];
  }

  getActionPoints() {
    return this.getSetting() - 10;
  }

  getNextSetting() {
    return this.getSetting() + 1;
  }

  isPurchasable() {
    return this.getSetting() < (this.props.lever.max || 40);
  }

  handleClick() {
    if (this.isPurchasable()) {
      this.props.onImproveLever(this.props.lever.name);
    }
  }

  fetchCalc() {
    const curEncoded = LeverUtils.encode(this.props.settings);
    const nextEncoded = encodeNext(this.props.settings, this.props.lever.name);
    if (!this.props.calc[curEncoded]) {
      this.props.onFetchCalc(curEncoded);
    }
    if (nextEncoded && !this.props.calc[nextEncoded]) {
      this.props.onFetchCalc(nextEncoded);
    }
  }

  render() {
    const curEncoded = LeverUtils.encode(this.props.settings);
    const curResults = this.props.calc[curEncoded];

    const nextEncoded = encodeNext(this.props.settings, this.props.lever.name);
    const nextResults = nextEncoded && this.props.calc[nextEncoded];

    let category = this.props.lever.name.split('.')[0];
    category = category[0].toUpperCase() + category.substring(1);
    const actionLevel = _.findLast(ACTION_TABLE, (i) => (
      i[0] <= this.getSetting()
    ));
    const baseline = this.props.lever.baseline;
    const val = this.props.lever.value(this.getSetting() - 10);
    let improvement = 0;
    if (baseline > 0) {
      improvement = 100 * (val / baseline);
    }
    let btn = '';
    if (!nextEncoded) {
      btn = 'At max';
    } else if (!curResults || !nextResults) {
      btn = 'Error';
    } else if (curResults.state === 'requested' ||
               nextResults.state === 'requested') {
      btn = 'Loading..';
    } else {
      const curEmissions = curResults.data.cumulativeEmissions;
      const nextEmissions = nextResults.data.cumulativeEmissions;
      const savings = (curEmissions - nextEmissions).toFixed(2);
      btn = (
        <div>
          <button className="btn btn-secondary" onClick={this.handleClick}>
            Improve for $100
          </button>
          <div>Savings: {savings} gigatons</div>
        </div>
      );
    }
    const pct = 100 * this.getActionPoints() / 30;
    return (
      <div
        className="row" key={this.props.lever.name}
        style={{ borderTop: '1px solid #ccc', paddingTop: '5px' }}
      >
        <div className="col-sm-8">
          <div>
            <strong>
              {this.props.lever.title}
            </strong>
            &nbsp;
            <Link to={`/play/${this.props.scenario.name}/info/${this.props.lever.name}`}>
              More info
            </Link>
          </div>
          <div>
            <progress
              className="progress progress-striped"
              value={pct}
              style={{ marginBottom: 0 }}
              max="100"
            >
              {this.getActionPoints()} action points ({actionLevel[1]}
            </progress>
          </div>
          <div>
            {val.toFixed(2)} {this.props.lever.unit} in 2050;
            {improvement.toFixed(1)}% of 2011 baseline
          </div>
        </div>
        <div className="col-sm-4">
          {btn}
        </div>
      </div>
    );
  }
}

LeverOption.propTypes = {
  settings: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired,
  calc: React.PropTypes.object.isRequired,
  lever: React.PropTypes.object.isRequired,
  onImproveLever: React.PropTypes.func.isRequired,
  onFetchCalc: React.PropTypes.func.isRequired
};

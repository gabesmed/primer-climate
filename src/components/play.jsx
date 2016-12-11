import React, { Component } from 'react';

import PlayHeader from '../partials/play/header';
import PlayTabs from '../partials/play/tabs';
import PlayEnd from '../partials/play/end';
import LeverUtils from '../utils/lever-utils';
import Scenario from '../constants/scenario';

export default class Play extends Component {

  componentDidMount() {
    this.props.onStartScenario();
  }

  componentWillReceiveProps(nextProps) {
    const nextPathwayEncoded = LeverUtils.encode(nextProps.pathway);
    nextProps.onFetchCalc(nextPathwayEncoded);
  }

  render() {
    if (this.props.player.year >= Scenario.numYears) {
      return <PlayEnd onStartScenario={this.props.onStartScenario} />;
    }
    return (
      <div>
        <PlayHeader
          calc={this.props.calc}
          pathway={this.props.pathway}
          player={this.props.player} />
        <PlayTabs />
        <br />
        {this.props.children}
      </div>
    );
  }
}

Play.propTypes = {
  calc: React.PropTypes.object.isRequired,
  pathway: React.PropTypes.object.isRequired,
  onStartScenario: React.PropTypes.func.isRequired,
  player: React.PropTypes.object,
  children: React.PropTypes.node.isRequired
};

import React, { Component } from 'react';
import LeverUtils from './lever-utils';

export default class ScenarioSelect extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    scenarios: React.PropTypes.array.isRequired,
    onSetScenario: React.PropTypes.Function.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    var currentEncoded = LeverUtils.encode(nextProps.levers);
    var value = '';
    this.props.scenarios.forEach((scenario, index) => {
      if (scenario.encoded === currentEncoded) {
        value = index;
      }
    });
    this.setState({
      value: value
    });
  }

  onScenarioChange(e) {
    var scenarioIndex = parseInt(e.target.value, 10);
    this.props.onSetScenario(this.props.scenarios[scenarioIndex]);
  }

  render() {
    var scenarioOptions = this.props.scenarios.map((scenario, i) => {
      return (
        <option value={i} key={i}>
          {scenario.title}
        </option>
      );
    });
    return (
      <div>
        <select value={this.state.value} onChange={this.onScenarioChange.bind(this)}>
          <option value=''>---</option>
          {scenarioOptions}
        </select>  
      </div>
    );
  }
}

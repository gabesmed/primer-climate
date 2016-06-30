import React, { Component } from 'react'

import Constants from './constants'

export default class MenuScenarios extends Component {
  propTypes: {
    onSelectScenario: React.PropTypes.Function.isRequired
  }

  onClickScenario(i, e) {
    this.props.onSelectScenario(i)
  }

  render() {
    var scenarios = Constants.SCENARIOS.map((scenario, i) => {
      return (
        <div key={i} onClick={this.onClickScenario.bind(this, i)}>
          <h2>Choose: {scenario.title}</h2>
        </div>
      )
    })
    return (
      <div>
        {scenarios}
      </div>
    )
  }
}

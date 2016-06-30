import _ from 'lodash'
import React, { Component } from 'react'

import Constants from './constants'
import Levers from './levers'

export default class MenuScenarios extends Component {
  propTypes: {
    onSelectScenario: React.PropTypes.Function.isRequired
  }

  onClickScenario(i, e) {
    this.props.onSelectScenario(i)
  }

  render() {
    var scenarios = Constants.SCENARIOS.map((scenario, i) => {
      var leverTitles = scenario.leverNames
        .map((leverName) => {
          var lever = _.find(Levers, ['name', leverName])
          return (
            <li key={leverName}>
              {lever.title}
            </li>
          )
        })
      return (
        <div key={i} onClick={this.onClickScenario.bind(this, i)} style={{float: 'left', margin: '10px'}}>
          <h2>{scenario.title}</h2>
          <ul>
            {leverTitles}
          </ul>
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

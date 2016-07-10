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
            <li style={{listStyleType: 'none'}}key={leverName}>
              {lever.title}
            </li>
          )
        })
      return (
        <div key={i} className="card">
          <div className="card-block">
            <h4 className="card-title">
              {scenario.title}
            </h4>
            <ul style={{paddingLeft: 0}}>
              {leverTitles}
            </ul>
            <button className="btn btn-primary btn-block" onClick={this.onClickScenario.bind(this, i)}>Select</button>
          </div>
        </div>
      )
    })
    return (
      <div>
        <div className="row-fluid">
          <h1>Choose a scenario</h1>
        </div>
        <div className="row-fluid">
          <div className="card-columns">
            {scenarios}
          </div>
        </div>
      </div>
    )
  }
}

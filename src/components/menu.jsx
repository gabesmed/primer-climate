import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router'

import Constants from '../constants/constants'
import Levers from '../constants/levers'

export default class Menu extends Component {

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
            <Link
              className="btn btn-primary btn-block"
              to={`/play/${scenario.name}`}>Select</Link>
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

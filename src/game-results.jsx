import _ from 'lodash'
import React, { Component } from 'react'

import calc from './calc'
import Constants from './constants'
import LeversTable from './levers-table.jsx'
import LeverUtils from './lever-utils'

export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: null
    }
  }

  componentDidMount() {
    this.fetchResults(this.props.levers)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchResults(nextProps.levers)
  }

  fetchResults(levers) {
    var random = Math.random()
    this._latest = random
    calc.calc(levers)
      .then(results => {
        if (this._latest !== random) {
          return
        }
        this.setState({
          results: results
        })
      })
  }

  render() {
    if (!this.state.results) {
      return <div>No results.</div>
    }
    var emissions = this.state.results.cumulativeEmissions.toFixed(1)
    var estimate
    if (typeof this.state.results.lowEstimate === 'number') {
      estimate = (
        this.state.results.lowEstimate.toFixed(2) + "°C" + '–' +
        this.state.results.highEstimate.toFixed(2) + "°C"
      )
    } else {
      estimate = 'Catastrophic warming'
    }
    return (
      <div>
        <h4>The World in 2100</h4>
        <div>Cumulative Emissions: {emissions} Gigatons</div>
        <div>Global Mean Temp: {estimate}</div>
      </div>
    )
  }
}

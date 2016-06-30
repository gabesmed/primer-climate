import _ from 'lodash'
import React, { Component } from 'react'

import calc from './calc'
import Constants from './constants'
import LeversTable from './levers-table.jsx'
import LeverUtils from './lever-utils'

export default class Game extends Component {

  constructor(props) {
    var rcp85 = _.find(Constants.STOCK_PATHWAYS, ['title', 'RCP 8.5'])
    super(props)
    this.state = {
      player: Object.assign({}, props.scenario.startingPlayer),
      levers: LeverUtils.decode(rcp85.encoded),
      results: null
    }
  }

  componentDidMount() {
    this.fetchResults(this.state.levers)  
  }

  onSpendMoney(amount) {
    this.setState({
      player: Object.assign({}, this.state.player, {
        money: this.state.player.money - amount
      })
    })
  }

  handleCancel(e) {
    e.preventDefault()
    this.props.onCancel()
  }

  onSetLever(key, newSetting) {
    var newLever = {}
    newLever[key] = newSetting
    this.setLevers(Object.assign({}, this.state.levers, newLever))
  }

  onSetScenario(scenario) {
    this.setLevers(LeverUtils.decode(scenario.encoded))
  }

  setLevers(levers) {
    this.setState({levers: levers})
    this.fetchResults(levers)
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
    var results = <div>No results.</div>
    if (this.state.results) {
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
      results = (
        <div>
          <h4>The World in 2100</h4>
          <div>Cumulative Emissions: {emissions} Gigatons</div>
          <div>Global Mean Temp: {estimate}</div>
        </div>
      )
    }
    return (
      <div>
        <a href='' onClick={this.handleCancel.bind(this)}>
          &larr; back
        </a>
        <table>
          <thead>
            <tr>
              <th>Assets</th>
              <th>Options</th>
              <th>Climate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Money: ${this.state.player.money}
              </td>
              <td>
                <LeversTable
                  settings={this.state.levers}
                  includeLeverNames={this.props.scenario.levers}
                  onSetLever={this.onSetLever.bind(this)}
                  onSpendMoney={this.onSpendMoney.bind(this)}
                />
              </td>
              <td>
                {results}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

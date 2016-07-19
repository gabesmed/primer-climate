import _ from 'lodash'
import React, { Component } from 'react'

import calc from './calc'
import Constants from './constants'
import GameResults from './game-results.jsx'
import LeversTable from './levers-table.jsx'
import LeverUtils from './lever-utils'

export default class Game extends Component {

  constructor(props) {
    var rcp85 = _.find(Constants.STOCK_PATHWAYS, ['title', 'RCP 8.5'])
    super(props)
    this.state = {
      player: this.getStartingPlayer(props.scenario),
      levers: LeverUtils.decode(rcp85.encoded),
    }
  }

  getStartingPlayer(scenario) {
    let player = Object.assign({
      production: {}
    }, scenario.startingPlayer)

    scenario.products.forEach((product) => {
      player.production[product.name] = {
        production: 0
      }
    })
    return player
  }

  handleSpendMoney(amount) {
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

  handleSetLever(key, newSetting) {
    var newLever = {}
    newLever[key] = newSetting
    this.setState({
      levers: Object.assign({}, this.state.levers, newLever)
    })
  }

  render() {
    const yearNum = this.state.player.year - this.props.scenario.startingPlayer.year + 1
    const numYears = this.props.scenario.numYears
    const products = this.props.scenario.products.map((product) => {
      const production = this.state.player.production[product.name]
      return (
        <div key={product.name}>
          {product.title}: {production.production}
        </div>
      )
    });
    return (
      <div>
        <div>
          <a href='' onClick={this.handleCancel.bind(this)}>
            &larr; back
          </a>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2>Your store</h2>
            <p>
              Year: {this.state.player.year} ({yearNum}/{numYears})<br/>
              Money: ${this.state.player.money}<br/>
              Brand: {this.state.player.brand}<br/>
              Employees: {this.state.player.employees}
            </p>
            {products}
          </div>
          <div className="col-sm-6">
            <GameResults levers={this.state.levers} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <LeversTable
              settings={this.state.levers}
              includeLeverNames={this.props.scenario.leverNames}
              onSetLever={this.handleSetLever.bind(this)}
              onSpendMoney={this.handleSpendMoney.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

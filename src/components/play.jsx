import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router'

import Constants from '../constants/constants'
import GameResults from './game-results.jsx'
import LeversTable from './levers-table.jsx'
import LeverUtils from '../utils/lever-utils'

export default class Play extends Component {

  componentDidMount() {
    this.props.onStartScenario(this.props.params.scenarioName)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.encoded) {
      const results = nextProps.calc[nextProps.encoded]
      if (!results) {
        nextProps.onFetchCalc(nextProps.encoded)
      }
    }
  }

  render() {
    if (!this.props.player || !this.props.scenario) {
      return <div>null</div>;
    }

    // results
    const results = this.props.calc[this.props.encoded]

    // display
    const yearNum = this.props.player.year - this.props.scenario.startingPlayer.year + 1
    const numYears = this.props.scenario.numYears
    const products = this.props.scenario.products.map((product) => {
      const production = this.props.player.production[product.name]
      return (
        <div key={product.name}>
          {product.title}: {production.production}/year
        </div>
      )
    });
    return (
      <div>
        <div>
          <Link to={`/`}>&larr; back</Link>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2>Your store</h2>
            <p>
              Year: {this.props.player.year} ({yearNum}/{numYears})<br/>
              Money: ${this.props.player.money}<br/>
              Brand: {this.props.player.brand}<br/>
              Employees: {this.props.player.employees}
            </p>
            {products}
          </div>
          <div className="col-sm-6">
            <GameResults results={results} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <LeversTable
              calc={this.props.calc}
              settings={this.props.levers}
              includeLeverNames={this.props.scenario.leverNames}
              onImproveLever={this.props.onImproveLever}
              onFetchCalc={this.props.onFetchCalc}
            />
          </div>
        </div>
      </div>
    )
  }
}

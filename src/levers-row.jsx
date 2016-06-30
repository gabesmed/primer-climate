import _ from 'lodash'
import React, { Component } from 'react'

import calc from './calc'

const ACTION_TABLE = [
  [10, 'Minimal abatement'],
  [20, 'Ambitious'],
  [30, 'Very ambitious'],
  [40, 'Extremely ambitious']
]

export default class LeversRow extends Component {
  propTypes: {
    settings: React.PropTypes.object.isRequired,
    lever: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired,
    onSpendMoney: React.PropTypes.Function.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      curResults: null,
      nextResults: null
    }
  }

  componentWillReceiveProps(nextProps) {
    var rnd = Math.random()
    this._latest = rnd
    this.setState({
      curResults: null,
      nextResults: null
    })
    if (this.isPurchasable()) {
      var nextSettings = _.assign({}, this.props.settings)
      nextSettings[this.props.lever.name] = this.getNextSetting()
      calc.calc(this.props.settings)
        .then((results) => {
          if (rnd === this._latest) {
            this.setState({
              curResults: results
            })
          }
        })
      calc.calc(nextSettings)
        .then((results) => {
          if (rnd === this._latest) {
            this.setState({
              nextResults: results
            })
          }
        })
    }
  }

  getSetting() {
    return this.props.settings[this.props.lever.name]
  }

  getNextSetting() {
    return this.getSetting() + 1
  }

  isPurchasable() {
    return this.getSetting() < (this.props.lever.max || 40)
  }

  handleClick() {
    if (this.isPurchasable()) {
      this.props.onSetLever(this.props.lever.name, this.getNextSetting())
      this.props.onSpendMoney(100)
    }
  }

  render() {
    var category = this.props.lever.name.split('.')[0]
    category = category[0].toUpperCase() + category.substring(1)
    const actionLevel = _.findLast(ACTION_TABLE, (i) => {
      return i[0] <= this.getSetting()
    })
    const baseline = this.props.lever.baseline
    var val = this.props.lever.value(this.getSetting())
    var improvement = 0
    if (baseline > 0) {
      improvement = 100 * (val / baseline)
    }
    var actions = ''
    if (this.isPurchasable()) {
      var nextVal = this.props.lever.value(this.getNextSetting())
      actions = (
        <button onClick={this.handleClick.bind(this)}>
          Improve to {nextVal.toFixed(2)} for $100
        </button>
      )
    }
    var savings = ''
    if (this.state.curResults && this.state.nextResults) {
      var curEmissions = this.state.curResults.cumulativeEmissions
      var nextEmissions = this.state.nextResults.cumulativeEmissions
      console.log('curEmissions', curEmissions, 'nextEmissions', nextEmissions)
      var savings = (curEmissions - nextEmissions).toFixed(2) + ' Gigatons saved'
    }
    var url = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${this.props.lever.num}/en`
    return (
      <tr key={this.props.lever.name}>
        <td>
          <a href={url}>
            {category}: {this.props.lever.title}
          </a>
          <br/>
          In 2050, will be {val.toFixed(2)} {this.props.lever.unit}
          <br/>
          ({improvement.toFixed(1)}% of 2011 baseline - {actionLevel[1]})
        </td>
        <td>
          {actions}<br/>
          {savings}
        </td>
      </tr>
    )
  }
}

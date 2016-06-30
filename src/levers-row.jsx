import _ from 'lodash'
import React, { Component } from 'react'

import calc from './calc'
import descriptions from './descriptions.json'

const ACTION_TABLE = [
  [10, 'Minimal action'],
  [20, 'Ambitious action'],
  [30, 'Very ambitious action'],
  [40, 'Extremely ambitious action']
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
    var val = this.props.lever.value(this.getSetting() - 10)
    var improvement = 0
    if (baseline > 0) {
      improvement = 100 * (val / baseline)
    }
    var actions = ''
    if (this.isPurchasable()) {
      var nextVal = this.props.lever.value(this.getNextSetting() - 10)
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
      var savings = 'save ' + (curEmissions - nextEmissions).toFixed(2) + ' gigatons'
    }
    var url = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${this.props.lever.num}/en`

    var desc = descriptions.descriptions[this.props.lever.num]
    // 0, 
    // "Lever", 
    // "Situation today", 
    // "Interactions with other levers", 
    // "One-pager context", 
    // "Things to consider", 
    // "1-pager Level 1", 
    // "1-pager Level 2", 
    // "1-pager Level 3", 
    // "1-pager Level 4"
    var onePager = desc[5 + Math.floor(this.getSetting() / 10)]

    return (
      <tr key={this.props.lever.name}>
        <td>
          <a href={url}>
            {category}: {this.props.lever.title}
          </a>
          <br/>
          In 2050, will be {val.toFixed(2)} {this.props.lever.unit}
          <br/>
          {improvement.toFixed(1)}% of 2011 baseline - {actionLevel[1]} ({this.getSetting()})
          <br/>
          <p className='one-pager'>
            {onePager}
          </p>
        </td>
        <td>
          {actions}<br/>
          <small>{savings}</small>
        </td>
      </tr>
    )
  }
}

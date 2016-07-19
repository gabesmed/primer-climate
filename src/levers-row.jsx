import _ from 'lodash'
import $ from 'jquery'
import React, { Component } from 'react'

import calc from './calc'
import descriptions from './descriptions.json'

const ACTION_TABLE = [
  [10, 'minimal'],
  [20, 'ambitious'],
  [30, 'very ambitious'],
  [40, 'extremely ambitious']
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

  componentDidMount() {
    $('a[data-tooltip]').tooltip();
    this.calcNext()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      curResults: null,
      nextResults: null
    })
    this.calcNext()
  }

  calcNext() {
    var rnd = Math.random()
    this._latest = rnd
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
        .catch((err) => {
          console.trace(err)
        })
      calc.calc(nextSettings)
        .then((results) => {
          if (rnd === this._latest) {
            this.setState({
              nextResults: results
            })
          }
        })
        .catch((err) => {
          console.trace(err)
        })
    }
  }

  getSetting() {
    return this.props.settings[this.props.lever.name]
  }

  getActionPoints() {
    return this.getSetting() - 10
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
    var btn = 'No action'
    if (this.isPurchasable() && this.state.curResults && this.state.nextResults) {
      var nextVal = this.props.lever.value(this.getNextSetting() - 1)
      var curEmissions = this.state.curResults.cumulativeEmissions
      var nextEmissions = this.state.nextResults.cumulativeEmissions
      var savings = (curEmissions - nextEmissions).toFixed(2)
      // Next step: improve to {nextVal.toFixed(2)} {this.props.lever.unit}
      // nextStep = (
      //   <div>
      //     <div>
      //       Savings: {savings} gigatons
      //     </div>
      //   </div>
      // )
      btn = (
        <div>
          <button className="btn btn-secondary" onClick={this.handleClick.bind(this)}>
            Improve for $100
          </button>
          <div>Savings: {savings} gigatons</div>
        </div>
      )
    }
    var pageUrl = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${this.props.lever.num}/en`

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
    var pct = 100 * this.getActionPoints() / 30;

    return (
      <div
        className="row" key={this.props.lever.name}
        style={{borderTop: '1px solid #ccc', paddingTop: '5px'}}
      >
        <div className="col-sm-8">
          <div>
            <strong>
              {this.props.lever.title}
            </strong>
            &nbsp;
            <a title={onePager}>More info</a>&nbsp;
            <a href={pageUrl}>See page</a>
          </div>
          <div>
            <progress
              className="progress progress-striped"
              value={pct}
              style={{marginBottom: 0}}
              max="100">
              {this.getActionPoints()} action points ({actionLevel[1]}
            </progress>
          </div>
          <div>
            {val.toFixed(2)} {this.props.lever.unit} in 2050; {improvement.toFixed(1)}% of 2011 baseline
          </div>
        </div>
        <div className="col-sm-4">
          {btn}
        </div>
      </div>
    )
  }
}

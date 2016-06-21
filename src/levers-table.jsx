import _ from 'lodash'
import React, { Component } from 'react'

import Constants from './constants'
import LeverUtils from './lever-utils'

const ACTION_TABLE = [
  [10, 'Minimal abatement'],
  [20, 'Ambitious'],
  [30, 'Very ambitious'],
  [40, 'Extremely ambitious']
]

class LeversRow extends Component {
  propTypes: {
    lever: React.PropTypes.object.isRequired,
    setting: React.PropTypes.number.isRequired,
    onSetLever: React.PropTypes.Function.isRequired,
    onSpendMoney: React.PropTypes.Function.isRequired
  }

  isPurchasable() {
    return this.props.setting < (this.props.lever.max || 40)
  }

  handleClick() {
    if (this.isPurchasable()) {
      this.props.onSetLever(this.props.lever[1], this.props.setting + 1)
      this.props.onSpendMoney(100)
    }
  }

  render() {
    var category = this.props.lever[1].split('.')[0]
    category = category[0].toUpperCase() + category.substring(1)
    const setting = this.props.setting
    const actionLevel = _.findLast(ACTION_TABLE, (i) => {
      return i[0] <= setting
    })
    var actions = ''
    if (this.isPurchasable()) {
      actions = (
        <button onClick={this.handleClick.bind(this)}>
          Buy +1 abatement for $100
        </button>
      )
    }
    return (
      <tr key={this.props.lever[1]}>
        <td><strong>{category}: {this.props.lever[2]}</strong></td>
        <td>{this.props.setting}</td>
        <td>{actionLevel[1]}</td>
        <td>
          {actions}
        </td>
      </tr>
    )
  }
}

export default class LeversTable extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired,
    onSpendMoney: React.PropTypes.Function.isRequired
  }

  render() {
    var rows = Constants.LEVERS
      .filter((lever) => {
        // Is it hidden generally
        return !lever[3] || lever[3].hidden !== true
      })
      .filter((lever) => {
        // Is it in the levers obj
        return !!this.props.levers[lever[1]]
      })
      .map((lever) => {
        var setting = this.props.levers[lever[1]]
        return <LeversRow
          key={lever[1]}
          lever={lever}
          setting={setting}
          onSetLever={this.props.onSetLever}
          onSpendMoney={this.props.onSpendMoney} />
      })
    return (
      <table className='levers-table'>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

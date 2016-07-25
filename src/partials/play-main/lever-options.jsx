import _ from 'lodash'
import React, { Component } from 'react'

import Levers from '../../constants/levers'
import LeverOption from './lever-option'

export default class LeverOptions extends Component {
  propTypes: {
    settings: React.PropTypes.object.isRequired,
    includeLeverNames: React.PropTypes.array.isRequired,
    onImproveLever: React.PropTypes.Function.isRequired
  }

  render() {
    var rows = Levers
      .filter((lever) => {
        // Is it in the levers obj
        return _.includes(this.props.includeLeverNames, lever.name)
      })
      .map((lever) => {
        var setting = this.props.settings[lever.name]
        return <LeverOption
          key={lever.name}
          lever={lever}
          settings={this.props.settings}
          calc={this.props.calc}
          onImproveLever={this.props.onImproveLever}
          onFetchCalc={this.props.onFetchCalc} />
      })
    return (
      <div>
        {rows}
      </div>
    )
  }
}

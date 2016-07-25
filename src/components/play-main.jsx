import React, { Component } from 'react'

import LeverOptions from '../partials/play-main/lever-options'

export default class PlayMain extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <LeverOptions
            calc={this.props.calc}
            settings={this.props.levers}
            scenario={this.props.scenario}
            onImproveLever={this.props.onImproveLever}
            onFetchCalc={this.props.onFetchCalc} />
        </div>
      </div>
    ) 
  }  
}

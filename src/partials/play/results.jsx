import React, { Component } from 'react'

export default class PlayResults extends Component {

  render() {
    if (!this.props.results) {
      return <div>No results.</div>
    }
    if (this.props.results.state === 'requested') {
      return <div>Loading...</div>
    }
    const data = this.props.results.data
    var emissions = data.cumulativeEmissions.toFixed(1)
    var estimate
    if (typeof data.lowEstimate === 'number') {
      estimate = (
        data.lowEstimate.toFixed(2) + '°C' + '–' +
        data.highEstimate.toFixed(2) + '°C'
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

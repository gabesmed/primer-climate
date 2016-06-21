import React, { Component } from 'react'

import Constants from './constants'
import Session from './session.jsx'
import SelectScenario from './select-scenario.jsx'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'select-scenario',
      scenario: null
    }
  }

  onSelectScenario(scenarioIndex) {
    this.setState({
      page: 'session',
      scenario: Constants.SCENARIOS[scenarioIndex]
    })
  }

  render() {
    if (this.state.page === 'select-scenario') {
      return <SelectScenario
        onSelectScenario={this.onSelectScenario.bind(this)} />
    }
    else if (this.state.page === 'session') {
      return <Session scenario={this.state.scenario} />
    }
  }
}

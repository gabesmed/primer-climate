import React, { Component } from 'react'

import Constants from './constants'
import Game from './game.jsx'
import MenuScenarios from './menu-scenarios.jsx'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'select-scenario',
      scenario: null
    }
  }

  handleSelectScenario(scenarioIndex) {
    this.setState({
      page: 'game',
      scenario: Constants.SCENARIOS[scenarioIndex]
    })
  }

  handleCancel() {
    this.setState({
      page: 'select-scenario',
      scenario: null
    })
  }

  render() {
    if (this.state.page === 'select-scenario') {
      return <MenuScenarios
        onSelectScenario={this.handleSelectScenario.bind(this)} />
    }
    else if (this.state.page === 'game') {
      return <Game
        scenario={this.state.scenario}
        onCancel={this.handleCancel.bind(this)}/>
    }
  }
}

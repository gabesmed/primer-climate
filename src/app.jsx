import _ from 'lodash';
import React, { Component } from 'react';
import Constants from './constants';
import LeversTable from './levers-table.jsx';
import LeverUtils from './lever-utils';
import ScenarioSelect from './scenario-select.jsx';

export default class App extends Component {

  constructor(props) {
    var rcp85 = _.find(Constants.SCENARIOS, ['title', 'RCP 8.5']);
    super(props);
    this.state = {
      isFetching: false,
      isFetchQueued: false,
      player: Constants.STARTING_PLAYER,
      levers: LeverUtils.decode(rcp85.encoded),
      result: null
    };
  }

  componentDidMount() {
    this.fetchResults();  
  }

  onSpendMoney(amount) {
    this.setState({
      player: Object.assign({}, this.state.player, {
        money: this.state.player.money - amount
      })
    });
  }

  onSetLever(key, newSetting) {
    var newLever = {};
    newLever[key] = newSetting;
    this.setLevers(Object.assign({}, this.state.levers, newLever));
  }

  onSetScenario(scenario) {
    this.setLevers(LeverUtils.decode(scenario.encoded));
  }

  setLevers(levers) {
    var encoded = LeverUtils.encode(levers);
    this.setState({levers: levers});
    this.fetchResults(levers);
  }

  fetchResults(levers) {
    if (this.state.isFetching) {
      this.setState({isFetchQueued: true});
      return;
    }
    this.setState({isFetching: true});
    var encoded = LeverUtils.encode(levers || this.state.levers);
    // console.log('fetching', encoded);
    var apiUrl = `/calc/${encoded}`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var lowEstimate = data[0].dashboard['temperature change Low'][1];
        var highEstimate = data[0].dashboard['temperature change High'][1];
        var result = {
          lowEstimate: lowEstimate,
          highEstimate: highEstimate
        };
        this.setState({
          isFetching: false,
          result: result
        })
        if (this.state.isFetchQueued) {
          this.setState({
            isFetchQueued: false
          });
          this.fetchResults();
        }
      });
  }

  render() {
    var results = <div>No results.</div>;
    if (this.state.result) {
      var estimate;
      if (typeof this.state.result.lowEstimate === 'number') {
        estimate = (
          this.state.result.lowEstimate.toFixed(1) + "°C" + '–' +
          this.state.result.highEstimate.toFixed(1) + "°C"
        );
      } else {
        estimate = 'Extreme warming – beyond the level assessed by the IPCC';
      }
      results = (
        <div>
          <div className='results-title'>Global Mean Temp in 2100</div>
          <div>{estimate}</div>
        </div>
      );
    }
    var appClass = 'app' + (this.state.isFetching ? ' fetching' : '');
    return (
      <div className={appClass}>
        <div className='right-panel'>
          <div className='player'>
            Money: ${this.state.player.money}
          </div>
          <div className='results'>
            {results}
          </div>
        </div>
        <div className='control-panel'>
          <LeversTable
              levers={this.state.levers}
              onSetLever={this.onSetLever.bind(this)}
              onSpendMoney={this.onSpendMoney.bind(this)} />
          <ScenarioSelect
            levers={this.state.levers}
            scenarios={Constants.SCENARIOS}
            onSetScenario={this.onSetScenario.bind(this)} />
        </div>
      </div>
    );
  }
}

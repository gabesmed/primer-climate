import React, { Component } from 'react';
import Constants from './constants';
import LeverUtils from './lever-utils';

class Lever extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
    group: React.PropTypes.object.isRequired,
    lever: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired
  }

  constructor(props) {
    super(props);
    this.key = this.props.section.key + '.' + this.props.group.key + '.' +
      this.props.lever.key;
    this.state = {
      setting: this.props.levers[this.key]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      setting: nextProps.levers[this.key]
    })
  }

  onChange(e) {
    this.setState({
      setting: e.target.value
    });
    this.props.onSetLever(this.key, e.target.value);
  }

  render() {
    var max = Math.floor(this.props.lever.max * 10) || 40;
    var step = this.props.lever.integer ? 10 : 1;
    return (
      <div className='lever'>
        {this.props.lever.title}:
        <input
          type="range" min="10" max={max} step={step}
          value={this.state.setting}
          onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
};

class LeverGroup extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
    group: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired
  }

  render() {
    var levers = this.props.group.levers.map((lever) => {
      return <Lever
        levers={this.props.levers}
        section={this.props.section}
        group={this.props.group}
        lever={lever}
        key={lever.key}
        onSetLever={this.props.onSetLever} />;
    });
    return (
      <div className='lever-group'>
        <h3 className='lever-group-title'>
          {this.props.section.title} - {this.props.group.title}
        </h3>
        {levers}
      </div>
    );
  }
};

class LeverSection extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired
  }

  render() {
    var groups = this.props.section.groups.map((group) => {
      return <LeverGroup
        levers={this.props.levers}
        section={this.props.section}
        group={group}
        key={group.key}
        onSetLever={this.props.onSetLever} />;
    });
    return (
      <div className='lever-section'>
        {groups}
      </div>
    );
  }
};

export default class Levers extends Component {
  propTypes: {
    levers: React.PropTypes.object.isRequired,
    onSetLever: React.PropTypes.Function.isRequired
  }

  render() {
    var sections = Constants.LEVER_SECTIONS.map((section) => {
      return <LeverSection
        levers={this.props.levers}
        section={section}
        key={section.key}
        onSetLever={this.props.onSetLever} />;
    });
    return <div>{sections}</div>;
  }
}

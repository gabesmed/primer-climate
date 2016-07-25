import _ from 'lodash'
import React, { Component } from 'react'

import Descriptions from '../constants/descriptions.json'
import Levers from '../constants/levers'

export default class PlayLeverInfo extends Component {
  render() {
    var lever = _.find(Levers, ['name', this.props.params.leverName])
    var pageUrl = `http://tool.globalcalculator.org/gc-lever-description-v23.html?id=${lever.num}/en`

    var desc = Descriptions.descriptions[lever.num]
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
    var setting = 30
    var onePager = desc[5 + Math.floor(setting / 10)]
    return (
      <div>
        {onePager}
      </div>
    )
  }
}

import { connect } from 'react-redux';

import { fetchCalcIfNeeded } from '../actions/calc';
import { selectBudgetOption } from '../actions/play';
import PlayBudget from '../components/play-budget';

const mapStateToProps = (state) => ({
  calc: state.calc,
  leverSettings: state.play.leverSettings,
  leverSettingsEncoded: state.play.leverSettingsEncoded,
  player: state.play.player,
  budget: state.play.budget,
  budgetSettings: state.play.budgetSettings,
  budgetSettingsEncoded: state.play.budgetSettingsEncoded,
  scenario: state.play.scenario
});

const mapDispatchToProps = (dispatch) => ({
  onSelectBudgetOption: (index) => {
    dispatch(selectBudgetOption(index));
  },
  onFetchCalc: (encoded) => {
    dispatch(fetchCalcIfNeeded(encoded));
  }
});

const PlayBudgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBudget);

export default PlayBudgetContainer;

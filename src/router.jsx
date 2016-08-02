import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Menu from './components/menu';
import Play from './containers/play';
import PlayEnvironment from './containers/play-environment';
import PlayBudget from './containers/play-budget';
import PlayBusiness from './components/play-business';
import PlayLeverInfo from './containers/play-lever-info';

function InvalidPage() {
  return <div>Page not found</div>;
}

function App({ children }) {
  return <div>{children}</div>;
}
App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Menu} />
      <Route path="play/:scenarioName" component={Play}>
        <IndexRoute component={PlayBudget} />
        <Route path="business" component={PlayBusiness} />
        <Route path="environment">
          <IndexRoute component={PlayEnvironment} />
          <Route path=":leverName" component={PlayLeverInfo} />
        </Route>
      </Route>
      <Route path="*" component={InvalidPage} />
    </Route>
  </Router>
);

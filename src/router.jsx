import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import connect from './connect';
import Menu from './components/menu';
import Play from './components/play';
import PlayEnvironment from './components/play-environment';
import PlayHotseat from './components/play-hotseat';
import PlayPolitics from './components/play-politics';
import PlayLeverInfo from './components/play-lever-info';

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
      <IndexRoute component={connect(Menu)} />
      <Route path="play" component={connect(Play)}>
        <IndexRoute component={connect(PlayHotseat)} />
        <Route path="politics" component={connect(PlayPolitics)} />
        <Route path="environment">
          <IndexRoute component={connect(PlayEnvironment)} />
          <Route path=":leverName" component={connect(PlayLeverInfo)} />
        </Route>
      </Route>
      <Route path="*" component={InvalidPage} />
    </Route>
  </Router>
);

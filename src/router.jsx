import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Menu from './components/menu'
import Play from './containers/play'

function InvalidPage() {
  return <div>Page not found</div>
}

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Menu}/>
      <Route path="play/:scenarioName" component={Play}/>
      // <Route path="*" component={InvalidPage}/>
    </Route>
  </Router>
);

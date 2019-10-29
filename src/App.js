import React from 'react'

import { Router, Route, Switch } from 'react-router-dom'
import Home from './views/home'
import Login from './views/login'
import { history } from './utils/history'
function App() {
  return (
    <div className="App">
      {/* test for conflict  */}
      <Router history={history}>
        <div id="maindiv" className="container-fluid no-gutters">
          <Switch>
            <Route
              path={`${process.env.PUBLIC_URL}/login`}
              exact
              component={Login}
            />
            <i>000000000</i>
            <i>11111111</i>
            <i>nishi 2222222222</i>
            <Route path={`${process.env.PUBLIC_URL}/`} component={Home} />
          </Switch>
        </div>
      </Router>
      <button>my button</button>
    </div>
  )
}

export default App

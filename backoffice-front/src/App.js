import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard"
import Locataires from './components/locataires/Locataires'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/locataires" component={Locataires} />
      </Switch>
    </Router>
  );
}

export default App;




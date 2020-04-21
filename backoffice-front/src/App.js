import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard"
import Locataires from './components/locataires/Locataires'
import Annonces from './components/annonces/Annonces'
import RDV from './components/rdv/RDV'
import Stats from './components/statistiques/Statistiques'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/locataires" component={Locataires} />
        <Route path="/annonces" component={Annonces} />
        <Route path="/rdv" component={RDV} />
        <Route path="/stats" component={Stats} />
      </Switch>
    </Router>
  );
}

export default App;




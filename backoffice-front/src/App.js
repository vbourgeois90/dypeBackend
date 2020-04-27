import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard"
import Locataires from './components/locataires/Locataires'
import LocDetail from './components/locataires/Locataire-detail'
import Dossier from './components/locataires/Dossier'
import Annonces from './components/annonces/Annonces'
import RDV from './components/rdv/RDV'
import Stats from './components/statistiques/Statistiques'

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import userList from './reducers/userList';
const store = createStore(combineReducers({userList}));


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/locataires" exact component={Locataires} />
        <Route path="/locataires/fiche" exact component={LocDetail} />
        <Route path="/locataires/dossier" component={Dossier} />
        <Route path="/annonces" component={Annonces} />
        <Route path="/rdv" component={RDV} />
        <Route path="/stats" component={Stats} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;




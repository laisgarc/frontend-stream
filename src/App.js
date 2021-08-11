import React from 'react';

import {
  Route,
  Router
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import './App.css';

//Pages
import Home from './Pages/Home'
import Casters from './Pages/Casters'
import Matchup from './Pages/Matchup'
import LeagueOverlay from './Pages/LeagueSpectatorOverlay'
import Picks from './Pages/OverlayMain.js'

function App() {
    const history = createBrowserHistory();

  return (
    <Router history={history}>
      <React.Fragment>
        <main role='main' className="content flex-shrink-0">
          <Route exact path="/" component={Home} />
          <Route path="/Casters" component={Casters} />
          <Route path="/Matchup" component={Matchup} />
          <Route path="/LeagueOverlay" component={LeagueOverlay} />
          <Route path="/Picks" component={Picks} />
        </main>
      </React.Fragment>
    </Router>
  );
}

export default App;

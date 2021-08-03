import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Main from './pages/main';
import About from './pages/about';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

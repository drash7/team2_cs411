import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';

import Home from "./Pages/Home/Home"
import Dashboard from "./Pages/Dashboard/Dashboard"
import About from "./Pages/About/About"
import ScrollToTop from "./components/ScrollToTop"
import Account from "./Pages/Account/Account"
import RequestPending from "./Pages/RequestPending/RequestPending";
import NotFoundPage from "./Pages/NotFoundPage";
import GraphPage from "./Pages/Graph/GraphPage";

import {GraphContextProvider, GraphContext} from "./contexts/GraphContextProvider"

class App extends Component {
  render() {
    return (
      <Router>
        <GlobalStyle />
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Home} />
          <GraphContextProvider>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/redirect" exact component={Dashboard} />
            <Route path="/about" exact component={About} />
            <Route path="/account" exact component={Account} />
            <Route path="/loading" exact component={RequestPending} />
            <Route path="/notfound" exact component={NotFoundPage} />
            <Route path="/bridge" exact component={GraphPage} />
          </GraphContextProvider>
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from "react";

import Navigation from "./components/shared/navigation/";
import Homepage from "./components/homepage";
import Menu from "./components/menu";
import Catering from "./components/catering";
import AboutUs from "./components/aboutUs";
import Media from "./components/media";
import Delivery from "./components/delivery";

import { Router, Route } from "react-router-dom";

import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";
ReactGA.initialize("UA-55491347-1");

const history = createHistory();
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  componentWillMount() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <Router history={history}>
        <div>
          <Navigation />
          <Route exact path="/" component={Homepage} />
          <Route path="/menu" component={Menu} />
          <Route path="/catering" component={Catering} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/media" component={Media} />
          <Route path="/delivery" component={Delivery} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";
import loadable from "./sharedUtilities/loadableHelper";

import Navigation from "./components/shared/navigation/";
import Homepage from "./components/homepage";
const Menu = loadable(() => import("./components/menu"));
const Catering = loadable(() => import("./components/catering"));
const AboutUs = loadable(() => import("./components/aboutUs"));
const Media = loadable(() => import("./components/media"));
const Delivery = loadable(() => import("./components/delivery"));

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

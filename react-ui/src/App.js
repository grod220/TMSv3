import React, { Component } from "react";
import Loadable from "react-loadable";
import { Router, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";
import Navigation from "./components/shared/navigation/";
import Homepage from "./components/homepage";

const Loading = () => <h1>Loading...</h1>;

const Menu = Loadable({
  loader: () => import("./components/menu"),
  loading: Loading
});

const Catering = Loadable({
  loader: () => import("./components/catering"),
  loading: Loading
});

const AboutUs = Loadable({
  loader: () => import("./components/aboutUs"),
  loading: Loading
});

const Media = Loadable({
  loader: () => import("./components/media"),
  loading: Loading
});

const Delivery = Loadable({
  loader: () => import("./components/delivery"),
  loading: Loading
});

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

import React, { Component } from "react";
import Navigation from "./components/shared/navigation";
import Hero from "./components/homepage/hero";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Hero} />
          {/* <Route path="/menu" component={SampleComp}/> */}
        </div>
      </Router>
    );
  }
}

export default App;

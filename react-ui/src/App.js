import React, { Component } from "react";
import Navigation from "./components/shared/navigation";
import Homepage from "./components/homepage";
import Menu from "./components/menu";
import Catering from "./components/catering";
import AboutUs from "./components/aboutus";
import Media from "./components/media";
import Delivery from "./components/delivery";


import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Homepage} />
          <Route path="/menu" component={Menu}/>
          <Route path="/catering" component={Catering}/>
          <Route path="/aboutus" component={AboutUs}/>
          <Route path="/media" component={Media}/>
          <Route path="/delivery" component={Delivery}/>
        </div>
      </Router>
    );
  }
}

export default App;

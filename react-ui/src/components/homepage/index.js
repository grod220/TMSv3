import React, { Component } from "react";

import BigHero from "./hero";
import OrderBar from "./orderBar";

class Homepage extends Component {
  render() {
    return (
      <div>
        <BigHero />
        <OrderBar />
      </div>
    );
  }
}

export default Homepage;

import React, { Component } from "react";

import BigHero from "./hero";
import OrderBar from "./orderBar";
import SocialBar from "./socialBar";

class Homepage extends Component {
  render() {
    return (
      <div>
        <BigHero />
        <OrderBar />
        <SocialBar />
      </div>
    );
  }
}

export default Homepage;

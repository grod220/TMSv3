import React, { Component } from "react";

import BigHero from "./hero";
import OrderBar from "./orderBar";
import SocialBar from "./socialBar";
import HomeMenu from "./homeMenu";

class Homepage extends Component {
  render() {
    return (
      <div>
        <BigHero />
        <OrderBar />
        <SocialBar />
        <HomeMenu />
      </div>
    );
  }
}

export default Homepage;

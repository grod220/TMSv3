import React, { Component } from "react";

import BigHero from "./hero";
import OrderBar from "./orderBar";
import SocialBar from "./socialBar";
import HomeMenu from "./homeMenu";
import TestimonialTaster from "./testimonialTaster";

class Homepage extends Component {
  render() {
    return (
      <div>
        <BigHero />
        <OrderBar />
        <SocialBar />
        <HomeMenu />
        <TestimonialTaster />
      </div>
    );
  }
}

export default Homepage;

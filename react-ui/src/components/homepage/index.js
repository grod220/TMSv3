import React, { Component } from "react";

import BigHero from "./hero";
// different names for the imported component and file. it will confuse

import OrderBar from "./orderBar";
import SocialBar from "./socialBar";
import HomeMenu from "./homeMenu";
import TestimonialTaster from "./testimonialTaster";

// if your component does not have a state or lifecycle method (componentWillMount, etc.), 
// then use the functional component
// const Homepage = () => (
//   <div>
//     <BigHero />
//     <OrderBar />
//     <SocialBar />
//     <HomeMenu />
//   </div>
// );

// one folder - one component
// split the components into folders (the hero in the hero folder, etc.)

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

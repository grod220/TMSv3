import React from "react";

import BigHero from "./hero/";
import OrderBar from "./orderBar/";
import SocialBar from "./socialBar/";
import HomeMenu from "./homeMenu/";
import TestimonialTaster from "./testimonialTaster/";
import Map from "./map/"
import Passion from "./passion/"

const Homepage = () => (
  <div>
    <BigHero />
    <OrderBar />
    <SocialBar />
    <HomeMenu />
    <TestimonialTaster />
    <Map />
    <Passion />
  </div>
);

export default Homepage;

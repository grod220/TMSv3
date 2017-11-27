import React from "react";

import BigHero from "./hero/";
import OrderBar from "./orderBar/";
import SocialBar from "./socialBar/";
import HomeMenu from "./homeMenu/";
import TestimonialTaster from "./testimonialTaster/";

const Homepage = () => (
  <div>
    <BigHero />
    <OrderBar />
    <SocialBar />
    <HomeMenu />
    <TestimonialTaster />
  </div>
);

export default Homepage;

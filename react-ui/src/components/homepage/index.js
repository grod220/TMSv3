import React from "react";

import TallHero from "./hero/";
import OrderBar from "./orderBar/";
import SocialBar from "./socialBar/";
import HomeMenu from "./homeMenu/";
import TestimonialTaster from "./testimonialTaster/";
import Map from "./map/"
import Passion from "./passion/"
import Footer from "./footer/"

const Homepage = () => (
  <div>
    <TallHero />
    <OrderBar />
    <SocialBar />
    <HomeMenu />
    <TestimonialTaster />
    <Map />
    <Passion />
    <Footer />
  </div>
);

export default Homepage;

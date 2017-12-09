import React from "react";

import TallHero from "./hero/";
import OrderBar from "./orderBar/";
import SocialBar from "./socialBar/";
import HomeMenu from "./homeMenu/";
import TestimonialTaster from "./testimonialTaster/";
import Map from "./map/";
import Passion from "./passion/";
import Footer from "./footer/";

import LazyLoad from "react-lazyload";

const Homepage = () => (
  <div>
    <TallHero />
    <OrderBar />
    <LazyLoad height={350}>
      <SocialBar />
    </LazyLoad>
    <LazyLoad height={400}>
      <HomeMenu />
    </LazyLoad>
    <LazyLoad height={350}>
      <TestimonialTaster />
    </LazyLoad>
    <LazyLoad height={450}>
      <Map />
    </LazyLoad>
    <LazyLoad height={400}>
      <Passion />
    </LazyLoad>
    <LazyLoad height={160}>
      <Footer />
    </LazyLoad>
  </div>
);

export default Homepage;

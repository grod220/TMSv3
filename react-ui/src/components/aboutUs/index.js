import React from "react";

import ShortHero from "../shared/shortHero/";
import AboutUsHero from "./familyDronePic.jpg";
import TopIntro from "./topIntro/";
import LocationInfo from "./locationInfo/";
import DiningRoom from "./diningRoom/";
import AboutOwners from "./aboutOwners/";
import GivingBack from "./givingBack/";

const AboutUs = () => (
  <div>
    <ShortHero image={AboutUsHero} headline="About the Stoppe Famiglia" />
    <TopIntro />
    <LocationInfo />
    <DiningRoom />
    <AboutOwners />
    <GivingBack />
  </div>
);

export default AboutUs;

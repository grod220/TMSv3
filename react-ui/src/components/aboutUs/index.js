import React from "react";

import ShortHero from "../shared/shortHero/";
import AboutUsHero from "./familyDronePic.jpg";

const AboutUs = () => (
  <div>
    <ShortHero image={AboutUsHero} headline="About the Stoppe Famiglia" />
    Here's the family!
  </div>
);

export default AboutUs;

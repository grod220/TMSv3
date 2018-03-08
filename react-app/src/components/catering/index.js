import React from "react";

import ShortHero from "../shared/shortHero/";
import CateringHero from "./tablesetPic.jpg";
import BodyText from "./bodyText/";
import ContactBar from "./contactBar/";
import CateringTestimonials from "./cateringTestimonials/";

const Catering = () => (
  <div>
    <ShortHero image={CateringHero} headline="Catering Options" />
    <BodyText />
    <ContactBar />
    <CateringTestimonials />
  </div>
);

export default Catering;

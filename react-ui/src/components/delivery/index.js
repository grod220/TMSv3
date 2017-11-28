import React from "react";

import ShortHero from "../shared/shortHero/";
import DeliveryHero from "./uberEatsBiker.jpg";

const Delivery = () => (
  <div>
    <ShortHero image={DeliveryHero} headline="Delivery Order" />
    SPECIAL Delivery....!
  </div>
);

export default Delivery;

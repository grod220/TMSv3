import React from "react";

import ShortHero from "../shared/shortHero/";
import MenuHero from "./foodImageTiles.jpg";
import TopText from "./topText/";
import MenuGrid from "./menuGrid/";

const Menu = () => (
  <div>
    <ShortHero image={MenuHero} headline="Our delicious menu" />
    <TopText />
    <MenuGrid />
  </div>
);

export default Menu;

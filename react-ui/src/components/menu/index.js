import React, { Component } from "react";

import ShortHero from "../shared/shortHero/";
import MenuHero from "./images/foodImageTiles.jpg";

class Menu extends Component {
  render() {
    return (
      <div>
        <ShortHero image={MenuHero} headline="Our delicious menu" />
        <h3>Here comes some menus!</h3>
      </div>
    );
  }
}

export default Menu;

import React, { Component } from "react";

import BigHero from "./hero";

class Homepage extends Component {
  render() {
    return (
      <div>
        <BigHero />
        <h2>Additional comonent</h2>
      </div>
    );
  }
}

export default Homepage;

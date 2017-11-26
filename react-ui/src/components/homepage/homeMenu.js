import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../media";

import MenuWidget from "./menuWidget";

import menuHeroImg from "../../assets/images/our_menu.jpg";


const MenuHero = styled.div`
    text-align: center;
    margin-bottom: 25px;
    background: url(${menuHeroImg}) no-repeat center 0;
    background-size: auto;
    height: 280px;
`

class HomeMenu extends Component {
  render() {
    return (
        <div>
      <MenuHero>
        Our Menu
      </MenuHero>
      <MenuWidget />
      </div>
    );
  }
}

export default HomeMenu;

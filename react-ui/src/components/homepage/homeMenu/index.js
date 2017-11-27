import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import MenuWidget from "./menuWidget/";
import menuHeroImg from "./images/our_menu.jpg";

const MenuHero = styled.div`
  text-align: center;
  background: url(${menuHeroImg}) no-repeat center 0;
  background-size: cover;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Dancing Script", cursive;
  color: white;
  font-size: 11rem;

  ${media.tablet`
      font-size: 10rem;`}

  ${media.phone`
      font-size: 9rem;`};
`;

const HomeMenu = () => (
  <div>
    <MenuHero>Our Menu</MenuHero>
    <MenuWidget />
  </div>
);

export default HomeMenu;

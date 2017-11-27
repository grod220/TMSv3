import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import { generateHeroImage } from "./generateHero";

const HeroImage = styled.div`
  height: 40rem;
  background-size: cover;
  background-position: 50% 0;
  background-color: #674c4d;
  background-image: url('${generateHeroImage(sessionStorage)}');
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const HeroText = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 -21rem 5rem 0;
  font-size: 3.2rem;

  ${media.tablet`
    margin-right: -11rem;
    font-size: 2.7rem;`};

  ${media.phone`
    align-items: center;
    font-size 5.3vw;
    margin: 0 0 5rem 0;`};
`;

const BigHero = () => (
  <HeroImage>
    <HeroText>
      <div>As featured on Diners, Drive-Ins & Dives</div>
      <div>
        <em>with Guy Fieri, Food Network</em>
      </div>
    </HeroText>
  </HeroImage>
);

export default BigHero;

import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import GuyFieriRays from "./images/guyFieriRays.jpg";
import dddLogo from "./images/dddLogo.png";
import groupPic from "./images/groupPic.jpg";

import guyThinkingPic from "./images/guyThinking.jpg";
import hotRodPic from "./images/hotRod.jpg";
import inTheKitchenPic from "./images/inTheKitchen.jpg";
import pestoCloseUpPic from "./images/pestoCloseUp.jpg";

const Container = styled.div`
  background: url(${GuyFieriRays}) no-repeat;
  background-size: 100%;
  background-position: top;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTwo = styled.div`
  display: flex;
  width: 80vw;

  ${media.tablet`
      width: 94vw;`} ${media.phone`
      width: 94vw;
      flex-direction: column`};
`;

const TripleDHero = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${media.phone`
      align-items: center;
      img:first-child {
          width: 55%;
      }
      img:nth-child(2) {
          width: 75%;
      }
      `};
`;

const GroupPic = styled.img`
  border: 0.5rem solid #902e2d;
  border-radius: 0.4rem;
`;

const SupplementalPics = styled.div`
  flex: 1;
  position: relative;
`;

const LinkToAmazon = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  color: gray;
  text-decoration: underline;
  font-style: italic;
`;

const FourPics = styled.div`
  div {
    /* margin-top: 3rem; */
  }

  div:first-child > img:nth-child(2), div:nth-child(2) > img:nth-child(2) {
      margin-top: 7rem;
  }

`;

const TwoPics = styled.div`
  display: flex;

  justify-content: space-around;

  img {
    align-self: center;
    max-width: 43%;
    box-shadow: 2rem 2rem 0rem -1.4rem rgba(144,46,45,1);
  }
`;

const Quote = styled.p``;

const TripleD = () => (
  <Container>
    <TopTwo>
      <TripleDHero>
        <img src={dddLogo} width="60%" alt="TripleD logo" />
        <GroupPic src={groupPic} width="97%" alt="Group pic with Guy Fieri" />
      </TripleDHero>
      <SupplementalPics>
        <FourPics>
          <TwoPics>
            <img src={inTheKitchenPic} alt="Chefs in the kitchen" />
            <img src={guyThinkingPic} alt="Guy Fieri looking contemplative" />
          </TwoPics>
          <TwoPics>
            <img src={pestoCloseUpPic} alt="Pesto meatball" />
            <img src={hotRodPic} alt="Guy Fieri in his hot rod" />
          </TwoPics>
        </FourPics>
        <a
          href="https://www.amazon.com/gp/product/B06ZZF8MJP/ref=oh_aui_d_detailpage_o01_?ie=UTF8&psc=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkToAmazon>Season 27, Episode 2: Wonder Women</LinkToAmazon>
        </a>
      </SupplementalPics>
    </TopTwo>
    <Quote>
      “It's really good. It's a cross between light and dense. Delicious... They
      are super tender. Out of the two meatballs, I like the vegetarian the
      most! This is something to write home about. Very nice.” -Guy Fieri
    </Quote>
  </Container>
);

export default TripleD;

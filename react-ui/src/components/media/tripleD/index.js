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
  width: calc(80vw + 10rem);

  ${media.tablet`
      width: 94vw;`} 
  
  ${media.phone`
      width: 94vw;
      flex-direction: column`};
`;

const TripleDHero = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

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
  border: 0.6rem solid #902e2d;
`;

const SupplementalPics = styled.div`
  flex: 1;
`;

const LinkToAmazon = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  font-style: italic;
  font-size: 2vw;
  background-color: #902e2d;
  padding: 0 1.4rem;

  ${media.phone`
    left: 11vw;
    font-size: 4vw;`} 
    
    &:hover {
    color: #f76e6e;
  }
`;

const FourPics = styled.div`
  div:first-child {
    margin-top: 4rem;

    ${media.tablet`
      margin-top: 6%;`} 
    ${media.phone`
      margin-top: -1.4rem;`};
  }

  div:nth-child(2) {
    margin-top: -4rem;
  }

  div:first-child > img:nth-child(2),
  div:nth-child(2) > img:nth-child(2) {
    margin-top: 7rem;
  }
`;

const TwoPics = styled.div`
  display: flex;

  justify-content: space-around;

  img {
    align-self: center;
    max-width: 43%;
    box-shadow: 2rem 2rem 0rem -1.4rem rgba(144, 46, 45, 1);
  }
`;

const Quote = styled.div`
  background-color: #902e2d;
  width: calc(67vw + 10rem);
  padding: 1vw;
  color: white;
  font-style: italic;
  font-size: calc(1.13vw + 0.8rem);

  ${media.tablet`
    width: 92vw;
    font-size: 3.4vw;`} 
  ${media.phone`
    width: 88vw;
    font-size: 4.3vw;
    margin-top: 2rem;`};
`;

const TripleD = () => (
  <Container>
    <TopTwo>
      <TripleDHero>
        <img src={dddLogo} width="60%" alt="TripleD logo" />
        <GroupPic src={groupPic} width="97%" alt="Group pic with Guy Fieri" />
        <a
          href="https://www.amazon.com/gp/product/B06ZZF8MJP/ref=oh_aui_d_detailpage_o01_?ie=UTF8&psc=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkToAmazon>Season 26, Episode 10: Wonder Women</LinkToAmazon>
        </a>
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

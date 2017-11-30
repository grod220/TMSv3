import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import GuyFieriRays from "./images/guyFieriRays.jpg";
import dddLogo from "./images/dddLogo.png";
import groupPic from "./images/groupPic.jpg";

const Container = styled.div`
  background: url(${GuyFieriRays}) no-repeat;
  background-size: 100%;
  background-position: top;
  height: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTwo = styled.div`
    display: flex;
    width: 80vw;
`

const TripleDHero = styled.div``;
const SupplementalPics = styled.div``;
const Quote = styled.p``;

const TripleD = () => (
  <Container>
    <TopTwo>
      <TripleDHero>
        <img src={dddLogo} width="100"/>
        <img src={groupPic} width="100" />
      </TripleDHero>
      <SupplementalPics>Stuff to come!</SupplementalPics>
    </TopTwo>
    <Quote>
      “It's really good. It's a cross between light and dense. Delicious... They
      are super tender. Out of the two meatballs, I like the vegetarian the
      most! This is something to write home about. Very nice.” -Guy Fieri
    </Quote>
  </Container>
);

export default TripleD;

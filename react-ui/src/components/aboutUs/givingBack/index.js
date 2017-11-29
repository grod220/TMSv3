import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import GroupPic from "./groupPic.jpg";

const Container = styled.div`
  display: flex;

  ${media.phone`
    flex-direction: column-reverse;`};
`;
const LeftText = styled.div`
  background-color: #902e2d;
  padding: 4rem;
  color: white;
  flex: 1;

  ${media.tablet`
    font-size: 1.8rem;`};

  ${media.phone`
    padding: 2rem;`};
`;

const Headline = styled.h2`
  font-family: "Dancing Script", cursive;
  font-size: 7rem;
  margin: 0 0 2rem;

  ${media.tablet`
    font-size: 6rem;`};
  ${media.phone`
    font-size: 6rem;`};
`;

const RightPic = styled.div`
  flex: 1;
  background: url(${GroupPic});
  height: 60rem;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.phone`
    height: 27rem;`};
`;

const GivingBack = () => (
  <Container>
    <LeftText>
      <Headline>Giving back</Headline>
      Isabella Morgia di Vicari and Jeff Morgia, co-owners of the Meatball
      Stoppe, developed the Community International Culinary Program for youth.
      Their mission is to feed families physically, emotionally, and
      spiritually---with a focus on healthy families as well as healthy bodies.
      With busy schedules and the daily pressures of life, meal time is more
      important than ever. It’s about giving kids hope, inspiration, and getting
      them back to the table.
    </LeftText>
    <RightPic />
  </Container>
);

export default GivingBack;

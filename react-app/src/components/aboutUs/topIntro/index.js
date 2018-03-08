import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import PrincipleFeature from "./principleComponent/";
import PlateSilhouette from "./eat.png";
import FamilySilhouette from "./family.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0 auto;

  ${media.phone`
    width: 90vw;`};
`;

const TopText = styled.p`
  text-align: center;
`;

const PrincipleBox = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    margin-right: 3rem;
  }
  > div:first-child {
    margin-left: 3rem;
  }
`;

const BottomText = styled.p`
  margin: 3rem 4rem;

  ${media.phone`
    margin: 3rem 0`};
`;

const TopIntro = () => (
  <Container>
    <TopText>The Meatball Stoppe is really only about two things.</TopText>
    <PrincipleBox>
      <PrincipleFeature
        image={PlateSilhouette}
        text="Making incredible Italian food at a reasonable price"
        alt="Plate of food"
      />
      <PrincipleFeature
        image={FamilySilhouette}
        text="Reinforcing famiglia traditions every step of the way"
        alt="A family holding hands"
      />
    </PrincipleBox>
    <BottomText>
      We do this by inviting all guests, from any background, to come and enjoy
      a meal with us. We want to share with you our philosophy of life and our
      heritage of Italian cooking. Every single dish is based on a recipe from
      our own famiglia. Whether it is our Nonna’s own traditional
      meatball---every dish is a story. Ask us!
    </BottomText>
  </Container>
);

export default TopIntro;

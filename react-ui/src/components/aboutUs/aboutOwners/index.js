import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import Highlight from "../../shared/highlight/";
import MomJeff from "./momjeff.jpg";
import Description from "./singleDescription/";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Quote = styled.div`
  text-align: center;
  font-size: 2.6rem;
  margin: 4rem 2rem;
`;

const OwnersPic = styled.div`
  background: url(${MomJeff}) no-repeat;
  width: 90rem;
  height: 45rem;
  background-size: cover;
  background-position: 50%;
  margin: 0 0 2rem;

  ${media.tablet`
    width: 85vw;
    height: calc(85vw / 2);`}
  ${media.phone`
    width: 100vw;
    height: calc(100vw / 2);`}
`;

const TwoDescriptions = styled.div`
  display: flex;
  width: 90rem;

  ${media.tablet`
    width: 85vw;`}
  ${media.phone`
    width: 95vw;
    font-size: 1.8rem`}

  div {
    flex: 1;
  }

  div:first-child {
    margin-right: 2rem;
  }
`;

const AboutOwners = () => (
  <Container>
    <Quote>
      <Highlight i>
        “It’s all about bringing your famiglia back to the table. That’s where
        meaningful moments happen.” <br />-Chef Isabella
      </Highlight>
    </Quote>
    <OwnersPic />
    <TwoDescriptions>
      <Description
        name="Isabella"
        text="Isabella is a co-owner of The Meatball Stoppe. She is a first generation American born of Italian decent in Brooklyn, New York. Isabella moved to Orlando in 1970, where she was raised in her family’s restaurant businesses. Isabella’s love of cooking came from her namesake, her grandmother, who lived in the family home and had a huge influence on Isabella’s passion for Italian traditions and food."
      />
      <Description
        name="Jeff"
        text="Jeff Morgia is CEO and co-Owner of The Meatball Stoppe. Jeff has been in the food industry 45+ years. He spent 12 years with the Sheraton Corporation and later joined Burger King corporation. Jeff retired after 27 years to join Isabella full time in the family catering company, eventually founding and opening The Meatball Stoppe."
      />
    </TwoDescriptions>
  </Container>
);

export default AboutOwners;

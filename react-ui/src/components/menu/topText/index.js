import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import Highlight from "../../shared/highlight/";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const Centered = styled.div`
  width: 78vw;
  ${media.tablet`
    width: 94vw;`}

  ${media.phone`
    width: 94vw;`}
`;

const TopText = () => (
  <Container>
    <Centered>
      Hand made like your Mamma and Nonna’s. All of our dishes are made with the
      highest quality meat and fresh ingredients. Also! There are plenty of
      options for <Highlight i>vegan &amp; glutten free (*gf)</Highlight> guests.
    </Centered>
  </Container>
);

export default TopText;

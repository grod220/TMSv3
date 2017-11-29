import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import Highlight from "../../shared/highlight/";

const Container = styled.div`
  width: 75vw;
  margin: 4rem auto;

  li {
    margin-bottom: 2rem;
  }

  ${media.tablet`
    width: 90vw`}

  ${media.phone`
    width: 90vw`}
`

const BodyText = () => (
  <Container>
    Let us take away your pressure! The Meatball Stoppe can be the missing
    ingredient for your event.
    <ul>
      <li>
        <Highlight i>Corporate or social catering</Highlight> including weddings, cocktail receptions,
        dinner parties, holiday parties.... and more. You name it, we do it.
      </li>
      <li>
      <Highlight i>Private Cooking Classes</Highlight> used for Corporate Team Building, Employee and
        Client Appreciation and many other celebrations.
      </li>
      <li><Highlight i>Premier Dining Experience</Highlight> with Chef Isabella in your home.</li>
    </ul>
  </Container>
);

export default BodyText;

import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import InsidePic from "./innerView.jpg";
import OutsidePic from "./outsideView.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TwoPicWrapper = styled.div`
  display: flex;
  height: 43rem;
  width: 100%;
  z-index: 10;

  ${media.tablet`
    flex-direction: column;
    height: 80rem`} ${media.phone`
    flex-direction: column;
    height: 60rem`};
`;

const LeftPic = styled.div`
  background: url(${OutsidePic});
  background-size: cover;
  background-position: 100%;
  flex: 2;
  margin-right: 2rem;

  ${media.tablet`
    flex:1;
    margin-right: 4rem`} ${media.phone`
    flex:1;
    margin: 0 2rem 2rem 2rem`};
`;

const RightPic = styled.div`
  background: url(${InsidePic});
  background-size: cover;
  background-position: 50%;
  flex: 3;

  ${media.tablet`
    flex:1;
    margin-left: 4rem`} ${media.phone`
    flex:1;
    margin: 0 2rem 2rem 2rem`};
`;

const RedBox = styled.div`
  background: #902e2d;
  margin: -28rem -5rem 0;
  padding: 28rem 5rem 0;
  width: 80vw;
  z-index: 1;
  color:white;

  ${media.phone`
    width: 100%;
    padding: 40rem 0rem 0;
    margin: -41rem -5rem 0;`}

  a {
    text-transform: uppercase;
    color: #f76e6e;
    text-decoration: underline;
  }

  p {
    ${media.phone`
      padding: 0 2rem;`}
  }
`;

const LocationInfo = () => (
  <Container>
    <TwoPicWrapper>
      <LeftPic />
      <RightPic />
    </TwoPicWrapper>
    <RedBox>
      <p>
        Located in East Orlando, just 10 minutes from Downtown Orlando or the
        Central Florida Research Park via the 408. Exit the 408 at 551/S.
        Goldenrod Road and we’re right here. Call us if you get lost! :{" "}
        <a
          href="https://goo.gl/maps/eb4QHbvh3z42"
          target="_blank"
          rel="noopener noreferrer"
        >
          GOOGLE MAPS LINK
        </a>
      </p>
      <p>
        We’re open Mon-Tues (11am-9pm), Wed-Sat (11am-10pm), and closed on
        Sundays.
      </p>
    </RedBox>
  </Container>
);

export default LocationInfo;

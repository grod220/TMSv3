import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import allSocialIcons from "./socialIconsInfo";
import LivePost from "./livePost/"

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TwoItemHolder = styled.div`
  display: flex;
  width: 80vw;
  justify-content: center;

  > div {
    flex: 1;
  }

  ${media.tablet`
    flex-direction:column;`}

  ${media.phone`
    flex-direction:column;
    width: 95vw;`};
`;

const LeftSide = styled.div`
  font-size: 2.4rem;
  padding: 4rem 2%;

  img {
    margin-right: 2.4rem;

    ${media.tablet`
      margin-right: 0`}

    ${media.phone`
      margin-right: 0`};
  }
`;

const Highlight = styled.span`
  color: #902e2d;
  font-weight: 700;
  font-style: italic;
`;

const Connect = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 4.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  ${media.tablet`
    display:none;`}

  ${media.phone`
    display:none;`};
`;

const SocialIcons = styled.div`
  ${media.desktop`
    min-width: 35.5rem`}

  ${media.tablet`
    display:flex;
    justify-content: space-around;
    margin: 2rem;`}

  ${media.phone`
    display:flex;
    justify-content: space-around;
    margin: 2rem;`};
`;



const SocialBar = () => (
  <Container>
    <TwoItemHolder>
      <LeftSide>
        <div>
          We are open{" "}
          <Highlight>Mon-Tues (11am-9pm), Wed-Sat (11am-10pm)</Highlight>, and
          closed on Sundays. Come visit us!
        </div>
        <Connect>Connect with us!</Connect>
        <SocialIcons>
          {allSocialIcons.map((service, i) => (
            <a
              href={service.linkTo}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              <img src={service.url} key={i} alt={service.name + " icon"} />
            </a>
          ))}
        </SocialIcons>
      </LeftSide>

    </TwoItemHolder>
  </Container>
);

export default SocialBar;

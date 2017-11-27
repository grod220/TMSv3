import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import FBSmallIcon from "./images/fblogo.svg";
import allSocialIcons from "./socialIconsInfo";

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

const OuterBox = styled.div`
  box-shadow: -0.5rem 0.1rem 1.3rem 0 rgba(0, 0, 0, 0.5);
  margin: -4.5rem 0 2rem 0;
  background: #fff;
  padding: 1rem;
  transition: all 0.6s;

  &:hover {
    transform: scale(1.03);
  }
`;

const SocialWrapper = styled.div`
  height: 37rem;
  overflow: hidden;
  position: relative;
  color: #337ab7;

  &:hover {
    color: coral;
  }
`;

const FBImage = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: relative;
  background-image: url("https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/23844654_1604387842916439_7177401149980960140_n.jpg?oh=d7c97640006cc19ff49f730ca63a130c&oe=5A993FEB");
`;

const ContentBlock = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: hsla(0, 0%, 100%, 0.85);
  line-height: 2.8rem;
  display: flex;
`;

const Caption = styled.div`
  font-size: 2rem;
  padding: 2rem;
  width: 85%;
`;

const SmallFBIcon = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
  margin-right: 1.8rem;
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
      <div>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/meatballstoppe/posts/1604387876249769"
        >
          <OuterBox>
            <SocialWrapper>
              <FBImage />
              <ContentBlock>
                <Caption>
                  Goooooo knights! Buy one get one meatball. Come swing by!
                </Caption>
                <SmallFBIcon>
                  <img
                    src={FBSmallIcon}
                    alt="Facebook icon"
                    width="40"
                    height="40"
                  />
                </SmallFBIcon>
              </ContentBlock>
            </SocialWrapper>
          </OuterBox>
        </a>
      </div>
    </TwoItemHolder>
  </Container>
);

export default SocialBar;

import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../media";

import FBIcon from "../../assets/images/facebook.png";
import FBSmallIcon from "../../assets/images/fblogo.svg";
import TwitterIcon from "../../assets/images/twitter.png";
import InstagramIcon from "../../assets/images/instagram.png";
import YelpIcon from "../../assets/images/yelp.png";

// move this to config file
const allSocialIcons = {
  facebook: { url: FBIcon, linkTo: "https://www.facebook.com/meatballstoppe/" },
  twitter: { url: TwitterIcon, linkTo: "https://twitter.com/orlandomeatball" },
  instagram: {
    url: InstagramIcon,
    linkTo: "https://www.instagram.com/themeatballstoppe/"
  },
  yelp: {
    url: YelpIcon,
    linkTo: "https://www.yelp.com/biz/the-meatball-stoppe-orlando-2"
  }
};

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
    flex-direction:column;
  `} ${media.phone`
    flex-direction:column;
  `};
`;

const LeftSide = styled.div`
  font-size: 2.4rem;
  padding: 4rem 2%;
  img {
    margin-right: 2.4rem;
    ${media.tablet`
      margin-right: 0`}
    ${media.phone`
      margin-right: 0`}
  }
`;

const Highlight = styled.span`
  color: #902e2d;
  font-weight: 700;
`;

const Connect = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 4.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  ${media.tablet`
    display:none;
  `} ${media.phone`
  display:none;
  `};
`;

const SocialIcons = styled.div`
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
  box-shadow: -5px 1px 13px 0 rgba(0, 0, 0, 0.5);
  margin-top: -4.5rem;
  background: #fff;
  padding: 10px;
  transition: all 0.6s;

  &:hover {
    transform: scale(1.03);
  }
`;

const SocialWrapper = styled.div`
  height: 370px;
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
  line-height: 28px;
  display: flex;
`;

const Caption = styled.div`
  font-size: 20px;
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

class SocialBar extends Component {
  render() {
    return (
      <Container>
        <TwoItemHolder>
          <LeftSide>
            <div>
              We are open{" "}
              <Highlight>Mon-Tues (11am-9pm), Wed-Sat (11am-10pm)</Highlight>,
              and closed on Sundays. Come visit us!
            </div>
            <Connect>Connect with us!</Connect>
            <SocialIcons>
              {/* It is better to use Object.entries
              {Object.entries(allSocialIcons).map(([key, value]) => (
                <a
                  href={value.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={key}
                >
                  <img
                    src={value.url}
                    key={key}
                    alt={key}
                  />
                </a>
              ))} */}
              {Object.keys(allSocialIcons).map(service => (
                <a
                  href={allSocialIcons[service].linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={service}
                >
                  <img
                    src={allSocialIcons[service].url}
                    key={service}
                    alt={service}
                  />
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
  }
}

export default SocialBar;

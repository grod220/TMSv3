import React, { Component } from "react";
import styled from "styled-components";

import FBIcon from "../../assets/images/facebook.png";
import TwitterIcon from "../../assets/images/twitter.png";
import InstagramIcon from "../../assets/images/instagram.png";
import YelpIcon from "../../assets/images/yelp.png";

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
  div {
    flex: 1;
  }
`;

const LeftSide = styled.div`
  font-size: 2.4rem;
  padding: 4rem 2%;
  img {
    margin-right: 2.4rem;
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
`;

const OuterBox = styled.div`
  box-shadow: -5px 1px 13px 0 rgba(0, 0, 0, 0.5);
  margin-top: -4.5rem;
  background: #fff;
  padding: 10px;

  div:hover {
    transform: scale(1.2);
  }
`;

const SocialWrapper = styled.div`
  height: 370px;
  overflow: hidden;
  position: relative;
  color: #337ab7;

  a:hover {
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
`;

const Caption = styled.div`
  font-size: 20px;
  padding: 20px 5% 0;
  margin-bottom: 0;
`;

const SmallSocialIcons = styled.div`
  padding: 10px;
  text-align: right;
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
          </LeftSide>
          <div>
            <OuterBox>
              <SocialWrapper>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/meatballstoppe/posts/1604387876249769"
                >
                  <FBImage />
                  <ContentBlock>
                    <Caption>
                      Goooooo knights! Buy one get one meatball. Come swing by!
                    </Caption>
                    <SmallSocialIcons />
                  </ContentBlock>
                </a>
              </SocialWrapper>
            </OuterBox>
          </div>
        </TwoItemHolder>
      </Container>
    );
  }
}

export default SocialBar;

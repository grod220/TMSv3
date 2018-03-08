import React, { Component } from "react";
import styled from "styled-components";

import FBSmallIcon from "./../images/fblogo.svg";
import * as firebase from "firebase";

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
  background-image: url(${props => props.src});
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

const LoadingAnimation = styled.div`
  opacity: ${props => (props.activated ? 1 : 0)};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 80rem 10.4rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  transition: 0.6s all;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -80rem 0;
    }
    100% {
      background-position: 80rem 0;
    }
  }
`;
class LivePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postUrl: "https://www.facebook.com/meatballstoppe",
      caption: "",
      imageUrl: "",
      loading: true
    };
  }

  componentDidMount() {
    const fbPostRef = firebase.database().ref().child("mostRecentFBPost");
    fbPostRef.on("value", snap => {
      let { imageURL, message, url } = snap.val();
      if (!message.length) {
          url = this.state.postUrl;
          message = "View the latest posts & announcements on Facebook"
      }
      this.setState({
        imageUrl: imageURL,
        caption: message,
        postUrl: url,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        <a rel="noopener noreferrer" target="_blank" href={this.state.postUrl}>
          <OuterBox>
            <SocialWrapper>
              <LoadingAnimation activated={this.state.loading} />
              <FBImage src={this.state.imageUrl} />
              <ContentBlock>
                <Caption>{this.state.caption}</Caption>
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
    );
  }
}

export default LivePost;

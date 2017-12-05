import React from "react";
import styled from "styled-components";
import { media } from "../../../../sharedUtilities/media";
import PropTypes from "prop-types";

const Backdrop = styled.div`
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  margin-top: ${props => (props.bottom ? "5rem" : "8rem")};

  ${media.tablet`
    margin:0;`} 
  
  ${media.phone`
    margin:0;`};
`;

const Container = styled.div`
  width: 73vw;
  display: flex;
  flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};
  align-items: center;

  @media (max-width: ${1345 / 16}em) {
    width: 91vw;
  }

  ${media.tablet`
    flex-direction: column-reverse;
    align-items: center;`} 
  
  ${media.phone`
    flex-direction: column-reverse;
    align-items: center;`} iframe {
    width: 56rem;
    height: 31.5rem;
    margin-top: ${props => (props.bottom ? "2.2rem" : "-10rem")};
    margin-bottom: ${props => (props.bottom ? "-8.2rem" : "2.2rem")};
    max-width: 100%;

    ${media.tablet`
      margin: 0 0 2rem 0;`} 
    
    ${media.phone`
      margin: 0 0 2rem 0;
      height: 18.5rem;`};
  }
`;

const Headline = styled.div`
  font-family: "Dancing Script";
  font-size: 5.8rem;
  width: ${props => (props.bottom ? "56rem" : "38rem")};
  color: white;
  padding: 0 6rem;

  @media (max-width: ${1090 / 16}em) {
    width: 39vw;
    font-size: 4.8rem;
  }

  ${media.tablet`
    margin: 3rem 0;
    width: auto;
    text-align: center;`} 
    
  ${media.phone`
    margin: 3rem 0;
    width: auto;
    font-size:8.2vw;
    text-align: center;`};
`;

const VideoClipBanner = ({
  color,
  metatitle,
  videoURL,
  headline,
  reverse,
  bottom
}) => (
  <Backdrop color={color} bottom={bottom}>
    <Container reverse={reverse} bottom={bottom}>
      <iframe title={metatitle} frameBorder="0" src={videoURL} />
      <Headline bottom={bottom}>{headline}</Headline>
    </Container>
  </Backdrop>
);

VideoClipBanner.propTypes = {
  color: PropTypes.string,
  metatitle: PropTypes.string,
  videoURL: PropTypes.string,
  headline: PropTypes.string,
  reverse: PropTypes.bool,
  bottom: PropTypes.bool
}

export default VideoClipBanner;

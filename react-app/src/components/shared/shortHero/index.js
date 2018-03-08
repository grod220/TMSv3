import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

const TopImage = styled.div`
  background: url(${props => props.image}) no-repeat center 0;
  background-size: cover;
  height: 28rem;
  background-position: 50%;
  background-color: #674c4d;
`;

const RedBar = styled.div`
  background: #902e2d;
  height: 7rem;
  display: flex;
  justify-content: center;

  ${media.tablet`
    height: 9vw;`}

  ${media.phone`
    height: 15vw;`};
`;

const HeadlineText = styled.span`
  font-size: 8.4rem;
  color: white;
  font-family: "Dancing Script", cursive;
  position: absolute;
  margin-top: -3.3rem;

  ${media.tablet`
    font-size: 8vw;
    margin-top: -2vw;`}

  ${media.phone`
    font-size: 9vw;
    margin: 0;
    position: static;
    padding-top: .7rem;`};
`;

const ShortHero = ({ image, headline }) => (
  <div>
    <TopImage image={image} />
    <RedBar>
      <HeadlineText>{headline}</HeadlineText>
    </RedBar>
  </div>
);

ShortHero.propTypes = {
  image: PropTypes.string,
  headline: PropTypes.string
};

export default ShortHero;

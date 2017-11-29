import React from "react";
import styled from "styled-components";
import { media } from "../../../../sharedUtilities/media";
import PropTypes from "prop-types";

const RedBox = styled.div`
  background-color: #902e2d;
  color: white;
  font-family: "Dancing Script", cursive;
  padding: 1.6rem;
  font-size: 3.6rem;
  text-align: center;

  ${media.tablet`
    font-size: 3rem;`}

  ${media.phone`
    font-size: 6vw;`};
`;

const PrincipleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  img {
    align-self: center;

    ${media.phone`
      width: 100%`};
  }
`;

const PrincipleFeature = ({ image, text, alt }) => (
  <PrincipleWrapper>
    <img src={image} alt={alt} />
    <RedBox>{text}</RedBox>
  </PrincipleWrapper>
);

PrincipleFeature.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  alt: PropTypes.string
};

export default PrincipleFeature;

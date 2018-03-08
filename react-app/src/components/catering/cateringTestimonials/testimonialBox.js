import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";
import PropTypes from "prop-types";

const RedBox = styled.div`
  background-color: #902e2d;
  color: white;
  padding: 4rem;
  width: 33rem;

  ${media.tablet`
    font-size: 1.8rem;
    padding: 1rem;
    width: inherit;`}

  ${media.phone`
    font-size: 1.8rem;
    padding: 1rem;
    width: inherit;`}
`;

const Top = styled.div`
  margin-bottom: 2rem;
`;

const TestimonialBox = ({ name, city, text }) => (
  <RedBox>
    <Top>
      {name}
      <br />
      {city}
      <br />
      ★★★★★
    </Top>
    {text}
  </RedBox>
);

TestimonialBox.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  text: PropTypes.string
};

export default TestimonialBox;

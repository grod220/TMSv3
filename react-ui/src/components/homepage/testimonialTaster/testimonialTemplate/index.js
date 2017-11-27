import React from "react";
import styled from "styled-components";
import { media } from "../../../../sharedUtilities/media";
import Proptypes from "prop-types";

import Highlight from "../../../shared/highlight";

const AlignOnSmallScreens = styled.p`
  ${media.tablet`
    text-align: right;`}

  ${media.phone`
    text-align: right;`};
`;

const Testimonial = ({ text, author, urlText, url, className }) => {
  return (
    <div className={className}>
      <p>
        <em>{text}</em>
      </p>
      <AlignOnSmallScreens>
        {author},{" "}
        <Highlight>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {urlText}
          </a>
        </Highlight>
      </AlignOnSmallScreens>
    </div>
  );
};

Testimonial.propTypes = {
  text: Proptypes.string,
  author: Proptypes.string,
  urlText: Proptypes.string,
  url: Proptypes.string,
  className: Proptypes.string
};

export default Testimonial;

import React from "react";
import styled from "styled-components";
// import { media } from "../../../sharedUtilities/media";
import PropTypes from "prop-types";

import Highlight from "../../../shared/highlight/";

const Description = ({ name, text }) => (
  <div>
    <Highlight i size={2.6}>About {name}</Highlight>
    <p>{text}</p>
  </div>
);

Description.proptypes = {
  name: PropTypes.string,
  text: PropTypes.string
};

export default Description;

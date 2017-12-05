import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

const Text = styled.div`
  text-align: center;
  font-size: 3.4rem;
  padding: 15rem 0 8rem 0;

  a {
    color: #902e2d;
    font-weight: 600;
  }

  ${media.tablet`
    padding: 7rem 0;
    font-size: 3rem;`}

  ${media.phone`
    padding: 3rem 0;
    font-size: 7.2vw;`}
`;

const MoreVidsText = () => (
  <Text>
    Lessons, features, and{" "}
    <a
      href="https://www.youtube.com/channel/UCQ0FlyVxpwpbN5GWUHd_ENg"
      target="_blank"
      rel="noopener noreferrer"
    >
      lots more on YouTube
    </a>
  </Text>
);

export default MoreVidsText;

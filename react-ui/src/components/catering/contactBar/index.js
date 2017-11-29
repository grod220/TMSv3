import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import ContactImage from "./partyPic.jpg";

const TopLine = styled.div`
  font-family: "Dancing Script", cursive;
  color: #902e2d;
  text-align: right;
  font-size: 5rem;
  margin: 0 7rem -0.7rem 0;

  ${media.phone`
    text-align: center;
    margin: 0;`}
`;

const TwoBoxContainer = styled.div`
  display: flex;
  height: 20rem;
  background-color: #902e2d;

  ${media.phone`
    flex-direction: column;
    text-align: center;`}
`;

const LeftImage = styled.div`
  flex: 1;
  background: url(${ContactImage});
  background-size: cover;
  background-position: 50%;
`;

const RightContactInfo = styled.div`
  flex: 1;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin: 0 2rem;

  ${media.tablet`
    font-size: 2.6rem`}

  ${media.phone`
    font-size: 2.6rem`}
`;

const ContactBar = () => (
  <div>
    <TopLine>Contact Chef Isabella</TopLine>
    <TwoBoxContainer>
      <LeftImage />
      <RightContactInfo>
        (407) 267-6033
        <br />
        isabella@themeatballstoppe.com
      </RightContactInfo>
    </TwoBoxContainer>
  </div>
);

export default ContactBar;

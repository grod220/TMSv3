import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import NewsClippings from "./newsClippings";
import Clipping from "./singleClipping/";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 80vw;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.tablet`
    width: 90vw;`} 
  
  ${media.phone`
    width: 90vw;`} 
    
    div {
      flex-basis: 30%;

      ${media.tablet`
        flex-basis: 45%;`} 
        
      ${media.phone`
        flex-basis: 92%;`};
  }
`;

const NewsOutlets = () => (
  <OuterContainer>
    <InnerContainer>
      {NewsClippings.map((item, i) => <Clipping {...item} key={i} />)}
    </InnerContainer>
  </OuterContainer>
);

export default NewsOutlets;

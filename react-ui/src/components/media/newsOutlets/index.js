import React from "react";
import styled from "styled-components"
import {media} from "../../../sharedUtilities/media"

import NewsClippings from "./newsClippings"
import Clipping from "./singleClipping/"

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`

const InnerContainer = styled.div`
  display: flex;
  width: 80vw;
`

const NewsOutlets = () => (
  <OuterContainer>
      <InnerContainer>
        {NewsClippings.map((item, i) => <Clipping {...item} key={i}/>)}
      </InnerContainer>
  </OuterContainer>
);

export default NewsOutlets;

import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import DiningRoomPic from "./diningRoom.jpg";

const Container = styled.div`
  display: flex;

  ${media.phone`
    flex-direction: column`}
`;

const LeftPic = styled.div`
  flex: 1;
  background: url(${DiningRoomPic});
  background-size: cover;
  background-position: 50%;
  height: 25rem;

`;

const RightTextBlock = styled.div`
  color: white;
  padding: 4rem;
  flex: 1;
  background-color: #bd977a;

  ${media.phone`
    padding: 2rem;`}
`;

const DiningRoom = () => (
  <Container>
    <LeftPic />
    <RightTextBlock>
      <strong>NEW!</strong> Private dining room available for rent for meetings,
      parties or engagements. Wi-Fi and HDMI TV. Call Isabella at 407-267-6033
      for details.
    </RightTextBlock>
  </Container>
);

export default DiningRoom;

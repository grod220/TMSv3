import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";

import TestimonialBox from "./testimonialBox";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 7rem 0;

  ${media.tablet`
    flex-direction: column;
    margin: 3rem 0;`}

  ${media.phone`
    flex-direction: column;
    margin: 3rem 0;`}

  > div {
    margin-right: 3rem;
    ${media.tablet`
      margin: 0 1rem 2rem 1rem`}

    ${media.phone`
      margin: 0 1rem 2rem 1rem`}
  }

  > div:first-child {
    margin-left: 3rem;

    ${media.tablet`
      margin: 0 1rem 2rem 1rem`}

    ${media.phone`
      margin: 0 1rem 2rem 1rem`}
  }
`;

const CateringTestimonials = () => (
  <Container>
    <TestimonialBox
      name="Terri B."
      city="Orlando"
      text="Isabella is the best! I have used her services for both professional and personal events. Her food is spectacular, her service is impeccable, and she makes all of the guests feel as if they were in her home. Isabella’s Bella Cucina is a family business and her husband, Jeff, is a great part of the team. They are wonderful people who make you feel as if your event is the most important event in"
    />
    <TestimonialBox
      name="A B."
      city="Gainsville"
      text="I run seminars for high level doctors to learn nutrition. My job is to teach them about the quality of food and the important role it plays in every day health. With that philosophy in mind, Isabella and her husband Jeff have provided me with the highest quality organic meals to meet my customers needs. I have continuously been given excellent feedback by these"
    />
    <TestimonialBox
      name="Robert B."
      city="Orlando"
      text="Mary and I have enjoyed entertaining in our home for many years but wanted to have a ” very special” evening for the key management team I work with. We asked Isabella to not only create wonderful food but also a wonderful experience which included a cooking demonstration. Our 20 guests declared it a home run and Mary and I think it was the best party we ever had."
    />
  </Container>
);

export default CateringTestimonials;

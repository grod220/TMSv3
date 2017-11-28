import React from "react";
import styled from "styled-components";

import CouplePic from "./jeffandisabella.jpg";

const Container = styled.div`
  display: flex;

  @media (max-width: ${700 / 16}em) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: white;
  background-color: #902e2d;
  padding: 4rem;

  @media (max-width: ${1170 / 16}em) {
    font-size: 1.8rem;
  }

  @media (max-width: ${700 / 16}em) {
    padding: 1.3rem;
    text-align: center;
  }
`;

const SectionTitle = styled.span`
  font-size: 6rem;
  font-family: "Dancing Script", cursive;
  margin: 2rem 0;

  @media (max-width: ${770 / 16}em) {
    font-size: 4rem;
  }

  @media (max-width: ${700 / 16}em) {
    margin: 0 0 1rem 0;
  }
`;

const RightImage = styled.div`
  flex: 1;
  height: 40rem;
  background-image: url(${CouplePic});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: relative;

  @media (max-width: ${700 / 16}em) {
    height: 25rem;
  }
`;

const Passion = () => (
  <Container>
    <LeftSide>
      <SectionTitle>Our Passion</SectionTitle>
      Jeff and Isabella Morgia created The Meatball Stoppe concept with the
      desire to share their passion for family traditions, uniqueness, freshness
      all in a non-traditional Italian style. The Meatball Stoppe has been
      Awarded the 'Best of the Best Meatballs' in Central Florida for 2016 and
      is a top 10 rated Orlando restaurant.
    </LeftSide>
    <RightImage />
  </Container>
);

export default Passion;

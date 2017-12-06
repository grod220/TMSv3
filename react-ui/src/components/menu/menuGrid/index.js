import React from "react";
import styled from "styled-components";
import MenuData from "./menuData";
import MenuItem from "./menuItem/";

const Container = styled.div`
  column-width: 35rem;
  column-gap: 1.5rem;
  width: 93%;
  margin: 4rem auto;
  column-fill: auto;
  margin: 0 auto;

  > div {
    column-break-inside: avoid;
    margin: 0 0.2rem 1.5rem;
    transition: all 0.5s;
    -webkit-backface-visibility: hidden;
  }

  > div:hover {
    transform: scale(1.03);
    box-shadow: 10px 10px 36px 0px rgba(0, 0, 0, 0.55);
  }
`;

const MenuGrid = () => (
  <Container>
    {MenuData.map((section, i) => <MenuItem {...section} key={i} />)}
  </Container>
);

export default MenuGrid;

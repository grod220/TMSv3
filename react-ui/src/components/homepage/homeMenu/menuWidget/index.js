import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
  width: 80vw;
  color: white;
  background-color: #a5a5a5;
  font-style: italic;
`;

const MenuWidget = () => (
  <Container>
    <PlaceHolder>Here is the menu widget!</PlaceHolder>
  </Container>
);

export default MenuWidget;

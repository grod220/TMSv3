import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${props => props.path});
  position: relative;
  text-align: right;
`;

const InnerText = styled.div`
  font-size: 110%;
  color: white;
  position: absolute;
  right: 1.4rem;
  font-style: italic;
  bottom: 1.4rem;
`;

const FoodPicSquare = ({ imagePath, name }) => (
  <Box path={imagePath}>
    <InnerText>{name}</InnerText>
  </Box>
);

export default FoodPicSquare;

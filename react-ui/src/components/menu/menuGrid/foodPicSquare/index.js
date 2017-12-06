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
`;

const FoodPicSquare = ({ imagePath }) => <Box path={imagePath} />;

export default FoodPicSquare;

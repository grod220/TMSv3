import React from "react";
import styled from "styled-components";

import MenuData from "./menuData";
import MenuItem from "./menuItem/";
import FoodPicData from "./foodPicData";
import FoodPicSquare from "./foodPicSquare/";

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

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const interweaveData = () => {
  const MenuArr = MenuData.map((section, i) => <MenuItem {...section} key={i} />);
  const FoodPicArr = shuffle(FoodPicData.map((url, i) => <FoodPicSquare imagePath={url} key={i} />));
  const largerLength = MenuArr.length > FoodPicArr.length ? MenuArr.length : FoodPicArr.length;
  const interwoven = [];
  for (let i = 0; i < largerLength; i++) {
    interwoven.push(MenuArr[i])
    interwoven.push(FoodPicArr[i])
  }
  return interwoven;
};

const MenuGrid = () => (
  <Container>
    {interweaveData()}
  </Container>
);

export default MenuGrid;

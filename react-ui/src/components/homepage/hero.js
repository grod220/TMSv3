import React, { Component } from "react";
import styled from "styled-components";

const generateHeroImage = storage => {
  const requireAll = requireContext =>
    requireContext.keys().map(requireContext);

  const allHeroes = requireAll(
    require.context("../../assets/images", false, /hero\d.+jpg/)
  );

  let randomIndex, randomHero;

  // Checks and saves to session storage
  if (storage && storage.getItem("heroIndex")) {
    randomIndex = Number(storage.getItem("heroIndex"));
    randomHero = allHeroes[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * allHeroes.length);
    randomHero = allHeroes[randomIndex];
  }

  storage.setItem("heroIndex", randomIndex);

  return randomHero;
};

const HeroImage = styled.div`
  height: 40rem;
  background-size: cover;
  background-position: 50% 0;
  background-color: #674c4d;
  background-image: url('${generateHeroImage(sessionStorage)}');
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const HeroText = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  margin: 0 -34rem 6rem 0;
  font-size: 1.2rem;
`

class BigHero extends Component {
  render() {
    return <HeroImage>
      <HeroText>
        <div>As featured on Diners, Drive-Ins and Dives</div>
        <div><em>with Guy Fieri, Food Network</em></div></HeroText>
    </HeroImage>;
  }
}

export default BigHero;

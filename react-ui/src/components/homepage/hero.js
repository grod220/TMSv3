import React, { Component } from "react";
import styled from "styled-components";

const generateHeroImage = storage => {
  const requireAll = requireContext =>
    requireContext.keys().map(requireContext);

  const allHeroes = requireAll(
    require.context("../../Assets/images", false, /hero\d.+jpg/)
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
`;

class Hero extends Component {
  render() {
    return <HeroImage />;
  }
}

export default Hero;

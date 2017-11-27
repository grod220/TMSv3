export const generateHeroImage = storage => {
  const requireAll = requireContext =>
    requireContext.keys().map(requireContext);

  const allHeroes = requireAll(
    require.context("./images", false, /hero\d.+jpg/)
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

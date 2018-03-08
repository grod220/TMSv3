export default price => {
  const halfsArr = String(price).split(".");
  if (halfsArr.length > 1 && halfsArr[1].length < 2) {
    return String(price) + "0";
  }
  return price;
};
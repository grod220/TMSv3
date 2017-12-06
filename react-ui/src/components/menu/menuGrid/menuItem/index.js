import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RedBox = styled.div`
  background-color: #902e2d;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  text-align: center;
`;

const Top = styled.div`
  align-self: center;
  text-align: center;
`;

const Headline = styled.span`
  font-size: 5rem;
  font-family: "Dancing Script";
  margin-right: 1rem;
`;

const Price = styled.span`
  font-size: 3rem;
`;

const GL = styled.span`
  color: #c17979;
  font-style: italic;
`;

const MenuItems = styled.div`
  line-height: 2rem;
`;

const addZeroIfNeeded = price => {
  const halfsArr = String(price).split(".");
  if (halfsArr.length > 1 && halfsArr[1].length < 2) {
    return String(price) + "0";
  }
  return price;
};

const MenuItem = ({ headline, price, description, items }) => (
  <RedBox>
    <Top>
      <Headline>{headline}</Headline>
      <Price>{price && ": $" + price}</Price>
      <div>
        <em>{description && "~" + description + "~"}</em>
      </div>
    </Top>
    <MenuItems>
      {items.map((item, i) => (
        <p key={i}>
          {item.name}
          <em>{item.price && " : $" + addZeroIfNeeded(item.price)}</em>
          <em>{item.extra && " : " + item.extra}</em>
          <GL>{item.gf && " *gf"}</GL>
        </p>
      ))}
    </MenuItems>
  </RedBox>
);

MenuItem.propTypes = {
  headline: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default MenuItem;

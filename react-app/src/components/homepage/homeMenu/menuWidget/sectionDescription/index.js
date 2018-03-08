import React from "react";
import styled from "styled-components";

import addZeroIfNeeded from "../../../../../sharedUtilities/addZero";

const Wrapper = styled.div`
  display: ${props =>
    props.activeSection === props.headline ? "flex" : "none"};
  transition: opacity 0.2s linear;
  opacity: ${props =>
    props.activeSection === props.headline ? props.vizi : 0};
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 2rem;
  flex: 1;
`;

const PriceAndDescription = styled.div`
  font-style: italic;
  color: #902e2d;
  text-align: center;
`;

const AllItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const LineItem = styled.div`
  padding: 2rem;
`;

const SectionDescription = ({
  headline,
  price,
  description,
  items,
  activeSection,
  vizi
}) => (
  <Wrapper activeSection={activeSection} headline={headline} vizi={vizi}>
    <PriceAndDescription>
      <b>{price && "$" + price}</b>
      {price && description && " :: "}
      {description}
    </PriceAndDescription>
    <AllItems>
      {items &&
        items.map((item, i) => (
          <LineItem key={i}>
            {item.name} {item.price && " :: $" + addZeroIfNeeded(item.price)}
          </LineItem>
        ))}
    </AllItems>
  </Wrapper>
);

export default SectionDescription;

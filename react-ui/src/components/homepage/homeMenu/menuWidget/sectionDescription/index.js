import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: ${props =>
    props.activeSection === props.headline ? "block" : "none"};
`;

const SectionDescription = ({ headline, price, description, items, activeSection }) => (
  <Wrapper activeSection={activeSection} headline={headline}>
    <div>
      {price} :: {description}
    </div>
    {items && items.map(item => <div>{item.name}</div>)}
  </Wrapper>
);

export default SectionDescription;

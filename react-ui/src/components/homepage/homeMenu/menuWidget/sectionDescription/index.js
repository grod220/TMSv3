import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: ${props =>
    props.activeSection === props.headline ? "flex" : "none"};
  transition: opacity 0.2s linear;
  opacity: ${props => props.activeSection === props.headline ? props.vizi : 0};
  flex-wrap: wrap;
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
    <div>
      {price} :: {description}
    </div>
    {items && items.map((item, i) => <div key={i}>{item.name}</div>)}
  </Wrapper>
);

export default SectionDescription;

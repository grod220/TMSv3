import React from "react";
import styled from "styled-components";

const MenuTitle = styled.span`
  padding: 1rem;
  text-align: center;
  color: ${props => (props.activeSection === props.name ? "#902e2d" : "#bbb")};

  &:hover {
    color: ${props => (props.activeSection === props.name ? "#902e2d" : "#f76e6e")};
    cursor: pointer;
  }
`;

const SectionToggler = props => <MenuTitle {...props}>{props.name}</MenuTitle>;

export default SectionToggler;

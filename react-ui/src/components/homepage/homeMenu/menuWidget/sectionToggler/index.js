import React from "react";
import styled from "styled-components";

const MenuTitle = styled.span`
  padding: 1rem;
  text-align: center;
  color: ${props => (props.activeSection === props.name ? "#902e2d" : "#bbb")};
  border-bottom: ${props => (props.activeSection === props.name ? ".1rem solid #902e2d" : "none")};
  margin-bottom: ${props => (props.activeSection === props.name ? "-.1rem" : "0")};

  &:hover {
    color: ${props => (props.activeSection === props.name ? "#902e2d" : "#ffa2a2")};
    cursor: pointer;
  }
`;

const SectionToggler = props => <MenuTitle {...props}>{props.name}</MenuTitle>;

export default SectionToggler;

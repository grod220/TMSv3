import styled from "styled-components";

export default styled.span`
  color: #902e2d;
  font-style: ${props => (props.i ? "italic" : props.b ? "bold" : "normal")};
`;

import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../media.js";
import { Link } from "react-router-dom";

const RedBar = styled.div`
  background: #902e2d;
  display: flex;
  justify-content: center;
  ${media.phone`
      height: 17rem;`};
`;

const Container = styled.div`
  width: 80vw;
  display: flex;

  a {
    width: 25%;
    display: flex;

    ${media.tablet`
      width: 100%;
      margin-left: 3rem;
      max-width: 33rem;
    `};

    ${media.phone`
      width: 100%;`};
  }

  a + a {
    ${media.tablet`
      margin-right: 3rem;
    `};
  }

  ${media.tablet`
    width: 100%;
    justify-content: space-evenly;`};

  ${media.phone`
    flex-direction: column;
    width: 91vw;
    justify-content: space-evenly;`};
`;

const WhiteButton = styled.button`
  background: #fff;
  color: #902e2d;
  font-size: 2vw;
  border: 0.2rem solid #902e2d;
  outline: 0.3rem solid #fff;
  font-family: inherit;
  margin: 2rem 1.5rem;
  padding: 0.6rem 1.2rem;
  flex: 1;
  cursor: pointer;

  ${media.tablet`
    font-size: 2.4rem;
    margin: 2rem 0`};
  ${media.phone`
    font-size: 2.4rem;
    margin: 0;`};
`;

class OrderBar extends Component {
  render() {
    return (
      <RedBar>
        <Container>
          <a
            href="http://eat24hrs.com/restaurants/order2/menu.php?id=71250"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhiteButton>Pickup Order</WhiteButton>
          </a>
          <Link to="/delivery">
            <WhiteButton>Delivery Order</WhiteButton>
          </Link>
        </Container>
      </RedBar>
    );
  }
}

export default OrderBar;

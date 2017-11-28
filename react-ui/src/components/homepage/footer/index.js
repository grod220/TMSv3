import React from "react";
import styled from "styled-components";
import NavItem from "../../shared/navigation/navItem/";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 5rem 5rem;
  background: #2d2d2d;
  color: #969595;
  display: flex;
  justify-content: center;
`;

const AllText = styled.div`
  display: flex;
  font-size: 2rem;
  flex-wrap: wrap;

  ul {
    list-style: none;
    margin-top: 0;
    padding: 0;
  }

  ul:first-child {
    margin-right: 6rem;
  }

  ul:nth-child(2) {
    margin-right: 6rem;
  }

  span {
    font-size: 1.4rem;
  }
`;

const Footer = () => (
  <Container>
    <AllText>
      <ul>
        <NavItem path="/menu">Menu</NavItem>
        <NavItem path="/catering">Catering</NavItem>
        <NavItem path="/aboutus">About Us</NavItem>
        <NavItem path="/media">Media</NavItem>
      </ul>
      <ul>
        <li>407-270-6505</li>
        <li>
          <a
            href="https://goo.gl/maps/eb4QHbvh3z42"
            target="_blank"
            rel="noopener noreferrer"
          >
            7325 Lake Underhill Road
          </a>
        </li>
        <br />
        <li>
          <a
            href="http://eat24hrs.com/restaurants/order2/menu.php?id=71250"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pickup Order
          </a>
        </li>
        <Link to="/delivery">
          <li>Delivery order</li>
        </Link>
      </ul>
      <span>© 2017 The Meatball Stoppe. All rights reserved.</span>
    </AllText>
  </Container>
);

export default Footer;

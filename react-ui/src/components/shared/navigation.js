import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../media.js";
import { Link } from "react-router-dom";

import TMSlogo from "../../Assets/images/logo.svg";
import MiniLogo from "../../Assets/images/minilogo.svg";

const LargeNavBar = styled.ul`
  color: rgb(61, 61, 61);
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 2.4rem;
  height: 4rem;
  margin: 5.2rem 0 0 0;

  ${media.tablet`font-size: 2.2rem;`} 
  ${media.phone`display: none;`} 

  a:hover {
    color: #902e2d;
  }

`;

const NavLinks = styled.div`
  display: flex;
  flex-basis: 25rem;
  justify-content: space-around;
`;

const Logo = styled.div`
  margin: -3.5rem 0 0 0;
  width: 19rem;
  z-index: 1;
  transition: all 0.7s;

  ${media.tablet`
    margin: -3rem 0 0 0;
    width: 15rem;
  `};
`;

const SubBar = styled.div`
  background: rgba(119, 103, 103, 0.64);
  color: #fff;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  position: absolute;

  ${media.phone`
    flex-direction: column;
  `};

  span:nth-child(1) {
    flex: 1;
    text-align: right;
    margin-right: 11.5rem;
    ${media.tablet`margin-right: 9rem;`};
    ${media.phone`
      margin: 0;
      display: flex;
      justify-content: center;
  `};
  }
  span:nth-child(2) {
    flex: 1;
    text-align: left;
    margin-left: 11.5rem;
    ${media.tablet`margin-left: 9rem;`};
    ${media.phone`
      margin: 0;
      display: flex;
      justify-content: center;
  `};
  }

  a:hover {
    color: #dbdbdb;
  }

  ${media.phone`
    flex-direction: column;
  `};
`;

const MobileNavBar = styled.div`
  display: none;
  width: 100%;
  height: 11rem;
  background-color: #711518;
  justify-content: space-between;
  align-items: center;

  ${media.phone`
    display: flex;
  `};

  span {
    color: white;
    font-size: 4.7rem;
    margin-left: 2rem;
  }
  img {
    height: 9.2rem;
  }
  div {
    width: 4.2rem;
    margin-right: 2rem;
  }
`;

class Navigation extends Component {
  render() {
    return (
      <div>
        <LargeNavBar>
          <NavLinks>
            <li>
              <Link to="/menu">Menus</Link>
            </li>
            <li>
              <Link to="/catering">Catering</Link>
            </li>
          </NavLinks>
          <Logo>
            <Link to="/">
              <img src={TMSlogo} alt="The Meatball Stoppe logo" />
            </Link>
          </Logo>
          <NavLinks>
            <li>
              {" "}
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/media">Media</Link>
            </li>
          </NavLinks>
        </LargeNavBar>
        <MobileNavBar>
          <span>&#9776;</span>
          <Link to="/">
            <img src={MiniLogo} alt="The Meatball Stoppe logo" />
          </Link>
          <div />
        </MobileNavBar>
        <SubBar>
          <span>
            <a
              href="https://goo.gl/maps/eb4QHbvh3z42"
              target="_blank"
              rel="noopener noreferrer"
            >
              7325 Lake Underhill Road
            </a>
          </span>
          <span>407-270-6505</span>
        </SubBar>
      </div>
    );
  }
}

export default Navigation;

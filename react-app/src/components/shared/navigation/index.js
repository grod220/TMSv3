import React, { Component } from "react";
import { Link } from "react-router-dom";

import TMSlogo from "./images/logo.svg";
import MiniLogo from "./images/minilogo.svg";
import NavItem from "./navItem";
import HamburgerIcon from "./images/hamburger.svg";

import {
  NavBar,
  NavLinks,
  DismissX,
  Logo,
  MobileMoreDetails,
  MobileNavBar,
  SubBar
} from "./navigation-styles";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileMenu: false
    };
  }

  toggleMobileMenu = status => () =>
    this.setState(prevState => ({
      showMobileMenu: status !== undefined ? status : !prevState.showMobileMenu
    }));

  render() {
    return (
      <div>
        <NavBar {...this.state}>
          <NavLinks>
            <DismissX onClick={this.toggleMobileMenu()}>
              <span>✕</span>
            </DismissX>
            <NavItem path="/menu" action={this.toggleMobileMenu(false)}>
              Menu
            </NavItem>
            <NavItem path="/catering" action={this.toggleMobileMenu(false)}>
              Catering
            </NavItem>
          </NavLinks>
          <Logo>
            <Link to="/">
              <img src={TMSlogo} alt="The Meatball Stoppe logo" />
            </Link>
          </Logo>
          <NavLinks>
            <NavItem path="/aboutus" action={this.toggleMobileMenu(false)}>
              About Us
            </NavItem>
            <NavItem path="/media" action={this.toggleMobileMenu(false)}>
              Media
            </NavItem>
            <MobileMoreDetails />
          </NavLinks>
        </NavBar>
        <MobileNavBar>
          <span onClick={this.toggleMobileMenu()}>
            <img src={HamburgerIcon} alt="Menu icon"  />
          </span>
          <Link to="/">
            <img src={MiniLogo} alt="The Meatball Stoppe logo" />
          </Link>
          <div />
        </MobileNavBar>
        <SubBar />
      </div>
    );
  }
}

export default Navigation;

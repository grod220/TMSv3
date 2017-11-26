import React, { Component } from "react";
import { Link } from "react-router-dom";

import TMSlogo from "../../assets/images/logo.svg";
import MiniLogo from "../../assets/images/minilogo.svg";

import {
  NavBar,
  NavLinks,
  DismissX,
  Logo,
  MobileMoreDetails,
  MobileNavBar,
  SubBar
} from "./navigation-styles";

// it should be a separate component in a separate folder
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileMenu: false
    };
  }

  // what is the purpose of event parameter?
  toggleMobileMenu = (event, status) =>
    this.setState(prevState => ({
      showMobileMenu: status !== undefined ? status : !prevState.showMobileMenu
    }));

  render() {
    return (
      <div>
        <NavBar {...this.state}>
          <NavLinks>
            <DismissX onClick={this.toggleMobileMenu}>
              <span>✕</span>
            </DismissX>
            <li>
              {/* I recommend creating a config file in the navigation folder. it will list all pages and URLs to them */}
              <Link
                to="/menu"
                // it's better to create the class method 
                // closeMenu = () => this.toggleMobileMenu(null, false)
                onClick={() => this.toggleMobileMenu(null, false)}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/catering"
                onClick={() => this.toggleMobileMenu(null, false)}
              >
                Catering
              </Link>
            </li>
          </NavLinks>
          <Logo>
            <Link to="/">
              <img src={TMSlogo} alt="The Meatball Stoppe logo" />
            </Link>
          </Logo>
          <NavLinks>
            <li>
              <Link
                to="/aboutus"
                onClick={() => this.toggleMobileMenu(null, false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/media"
                onClick={() => this.toggleMobileMenu(null, false)}
              >
                Media
              </Link>
            </li>
            <MobileMoreDetails />
          </NavLinks>
        </NavBar>
        <MobileNavBar>
          <span onClick={this.toggleMobileMenu}>&#9776;</span>
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

import React from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";
import MobileMenuBackground from "./images/mobile_menu.jpg";

const SubBarText = ({ className }) => {
    return (
      <div className={className}>
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
      </div>
    );
  };

export const NavBar = styled.ul`
list-style: none;
padding: 0;
display: flex;
justify-content: center;
font-size: 2.4rem;
height: 4rem;
margin: 5.2rem 0 0 0;

a:hover {
  color: #902e2d;
}

${media.tablet`font-size: 2.2rem;`} ${media.phone`
  position: fixed;
  background-color: white;
  left: ${props => (props.showMobileMenu ? "0" : "-30.7rem")};
  top: -5.2rem;
  height: 100%;
  width: 22.7rem;
  box-shadow: 20px 0px 54px -4px rgba(0,0,0,1);
  flex-direction: column;
  z-index: 1000;
  background: url(${MobileMenuBackground}) center top;
  background-size: cover;
  transition: left .25s ease-in;

  padding: 3rem 3.5rem 0 0;
  text-transform: uppercase;
  justify-content: inherit;
  align-items: flex-end;
  text-align: right;
  color: white;
  font-size: 3rem;
  line-height: 4.1rem;

  li {
    padding-bottom: 2rem;
  }

`};
`;

export const NavLinks = styled.div`
display: flex;
flex-basis: 25rem;
justify-content: space-around;

${media.phone`
  display: block;
  flex-basis: 0;
  justify-content: inherit;
`};
`;

export const Logo = styled.div`
margin: -3.5rem 0 0 0;
width: 19rem;
z-index: 1;
transition: all 0.7s;

${media.tablet`
  margin: -3rem 0 0 0;
  width: 15rem;
`};

${media.phone`
  display: none;
`};
`;

export const SubBar = styled(SubBarText)`
background: rgba(119, 103, 103, 0.64);
color: #fff;
width: 100%;
padding: 0.5rem 0;
font-size: 1.8rem;
display: flex;
justify-content: center;
position: absolute;

a:hover {
  color: #dbdbdb;
}

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
`;

export const MobileNavBar = styled.div`
display: none;
width: 100%;
height: 11rem;
background-color: #711518;
justify-content: space-between;
align-items: center;
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);

span {
  color: white;
  font-size: 4.7rem;
  margin-left: 2rem;
  cursor: pointer;
}
img {
  height: 9.2rem;
}
div {
  width: 4.2rem;
  margin-right: 2rem;
}

${media.phone`
  display: flex;
`};
`;

export const DismissX = styled.div`
display: none;
font-size: 2rem;
margin: -2rem -2rem 2rem 0;
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);

span {
  cursor: pointer;
}

${media.phone`
  display: block;
`};
`;

export const MobileMoreDetails = styled(SubBarText)`
display: none;
font-size: 1.6rem;
text-transform: none;
line-height: 2rem;

${media.phone`
  display: flex;
  flex-direction: column;
`};
`;
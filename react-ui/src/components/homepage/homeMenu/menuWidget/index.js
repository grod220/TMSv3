import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../../../sharedUtilities/media";

import MenuData from "../../../menu/menuGrid/menuData";
import SectionToggler from "./sectionToggler/";
import SectionDescription from "./sectionDescription/";
import { setTimeout } from "timers";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
`;

const TopTitles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;

  ${media.tablet`
    width: 90vw;`} ${media.phone`
    width: 94vw;`} > span {
    min-width: 12%;
  }
`;

const Descriptions = styled.div`
  display: flex;
  width: 80vw;

  ${media.tablet`
    width: 90vw;`} 
    
  ${media.phone`
    width: 94vw;`};
`;

class MenuWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      opacity: 0
    };
  }

  toggleSection = headline => {
    if (headline === this.state.active) return;

    this.setState({
      opacity: 0
    });
    setTimeout(() => {
      this.setState({
        active: headline
      });
    }, 200);
    setTimeout(() => {
      this.setState({
        opacity: 1
      });
    }, 201);
  };

  render() {
    return (
      <Container>
        <TopTitles>
          {MenuData.map((section, i) => (
            <SectionToggler
              name={section.headline}
              activeSection={this.state.active}
              key={i}
              onClick={() => this.toggleSection(section.headline)}
            />
          ))}
        </TopTitles>
        <Descriptions>
          {MenuData.map((section, i) => (
            <SectionDescription
              {...section}
              activeSection={this.state.active}
              vizi={this.state.opacity}
              key={i}
            />
          ))}
        </Descriptions>
      </Container>
    );
  }
}

export default MenuWidget;

import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../../sharedUtilities/media";
import { Link } from "react-router-dom";

const allTestimonials = [
  {
    text:
      '"I can truly say that these were the best meatballs my family has ever eaten!! They were generous in size and full of flavor." ★★★★★',
    author: "Tim Y.",
    urlText: "Yelp Elite",
    url:
      "https://www.yelp.com/biz/the-meatball-stoppe-orlando-2?hrid=6Ix12jMVnw7kdrZi6dTtxw"
  },
  {
    text:
      '"Together, they bring the best of both worlds, to serve an authentic Italian cuisine in a family-style dining experience."',
    author: "Catherine Cipris",
    urlText: "WESH 2 News",
    url:
      "http://www.wesh.com/article/the-meatball-shoppe-home-of-non-traditional-traditional-italian-cuisine/4443066"
  },
  {
    text:
      '"Homemade meatballs are hard to come by. Meatballs are prepared to the highest quality of freshness at Meatball Stoppe."',
    author: "Kha Duong",
    urlText: "Tasty Chomps",
    url:
      "http://tastychomps.com/2016/05/inside-look-at-the-meatball-stoppe.html"
  }
];

const Testimonial = ({ text, author, urlText, url, className }) => {
  return (
    <div className={className}>
      <p>
        <em>{text}</em>
      </p>
      <AlignOnSmallScreens>
        {author},{" "}
        <Highlight>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {urlText}
          </a>
        </Highlight>
      </AlignOnSmallScreens>
    </div>
  );
};

const StyledTestimonial = styled(Testimonial)`
  font-size: 2rem;
  margin-right: 3rem;
`;

const AlignOnSmallScreens = styled.p`
  ${media.tablet`
    text-align: right;
  `}
  ${media.phone`
    text-align: right;
  `}
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BorderBox = styled.div`
  border: 0.5rem solid #902e2d;
  padding: 3rem 3rem 1rem;
  width: 75vw;
  margin-top: 6.5rem;
`;

const RedHeader = styled.div`
  border: 2rem solid #fff;
  width: 56vw;
  margin: -8.6rem auto -1rem auto;
  padding: 0.2rem 2rem 0.8rem;
  text-align: center;
  background-color: #902e2d;
  color: white;
  font-size: 6.5rem;
  color: white;
  font-family: "Dancing Script", cursive;
  -webkit-backface-visibility: hidden;

  ${media.tablet`
    font-size: 4.3rem;`}
  ${media.phone`
    font-size: 4rem;`}

`;
const ThreeTestimonials = styled.div`
  display: flex;
  ${media.tablet`
    flex-direction: column;`}
  ${media.phone`
    flex-direction: column;`}
`;
const LearnMore = styled.div`
  font-style: italic;
  text-align: center;
`;

const Highlight = styled.span`
  color: #902e2d;
`;

class TestimonialTaster extends Component {
  render() {
    return (
      <FlexContainer>
        <BorderBox>
          <RedHeader>What they are saying</RedHeader>
          <ThreeTestimonials>
            {allTestimonials.map((testimonial, i) => (
              <StyledTestimonial {...testimonial} key={i} />
            ))}
          </ThreeTestimonials>
        </BorderBox>
        <LearnMore>
          See even more reviews on{" "}
          <a
            target="_blank"
            href="https://www.yelp.com/biz/the-meatball-stoppe-orlando-2"
            rel="noopener noreferrer"
          >
            <Highlight>Yelp (★★★★½ stars)</Highlight>
          </a>{" "}
          or our{" "}
          <Link to="/media">
            <Highlight>Media page</Highlight>
          </Link>
        </LearnMore>
      </FlexContainer>
    );
  }
}

export default TestimonialTaster;

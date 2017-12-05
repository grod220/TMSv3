import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-bottom: 4rem;
  font-style: italic;
  color: #989898;
  text-align: justify;

  audio {
    width: 100%;
  }
`;

const LinkOut = styled.a`
  color: #902e2d;
  text-decoration: underline;
`;

const Logo = styled.img`
  max-height: 30%;
  max-width: 74%;
  display: block;
  margin: 0 auto 1rem;
`;

const Clipping = ({ name, image, audio, linkTo, text }) => (
  <Container>
    <Logo src={image} alt={name} />
    "{text}" {""}
    {linkTo ? (
      <LinkOut href={linkTo} target="_blank" rel="noopener noreferrer">
        LINK
      </LinkOut>
    ) : null}
    {audio ? <div><audio controls src={audio} type="audio/mpeg3" /></div> : null}
  </Container>
);

Clipping.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  audio: PropTypes.string,
  linkTo: PropTypes.string,
  text: PropTypes.string
};

export default Clipping;

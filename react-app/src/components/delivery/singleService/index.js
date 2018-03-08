import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 70%;
    max-width: 40rem;
  }
`;

const ServiceButton = styled.a`
  margin-top: 1rem;
  font-size: 1.8rem;
  padding: 0.6rem 1.5rem;
  color: white;
  background-color: ${props => props.color};
  border-color: #46b8da;
  text-align: center;
  border-radius: 0.4rem;
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 21rem;
  background: #a3a3a3;
  margin: 4rem 0;
`;

const SingleService = ({ image, buttonText, color, url, line }) => (
  <Container>
    <img src={image} alt={buttonText} />
    <ServiceButton
      color={color}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </ServiceButton>
    {line ? <HorizontalLine /> : null}
  </Container>
);

SingleService.propTypes = {
  image: PropTypes.string,
  buttonText: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  line: PropTypes.bool
};

export default SingleService;

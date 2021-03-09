import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Title>ToDoList</Title>
      <Description>Jaki jest plan na dzisiaj?</Description>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 600px) {
    margin-bottom: 40px;
  }
`;
const Title = styled.h1`
  font-size: 2em;
  font-weight: 600;
`;
const Description = styled.p`
  font-size: 1.4em;
`;

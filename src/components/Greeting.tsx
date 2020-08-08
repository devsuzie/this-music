import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

interface Theme {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    active: string;
    highlight: string;
    white: string;
    black: string;
  };
  fonts: {
    futura: string;
    avenir: string;
  };
}

const theme: Theme = {
  colors: {
    primary: "#E6DEDE",
    primaryLight: "#EDE7E7",
    primaryDark: "#DBC9C9",
    active: "#DDADAD",
    highlight: "#1300FF",
    white: "#FFFFFF",
    black: "#121212",
  },
  fonts: {
    futura: "Futura",
    avenir: "Avenir",
  },
};

const Container = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: ${theme.fonts.futura}, sans-serif;
  width: 700px;
  text-align: center;
  font-size: 20px;
`;

const Paragraph = styled.p`
  margin: 20px 0 60px;
  color: ${theme.colors.active};
  font-weight: bold;
  letter-spacing: 0.03em;
  flex: 1;
`;

const LinkButton = styled(Link)`
  border: none;
  background-color: ${theme.colors.highlight};
  color: ${theme.colors.white};
  border-radius: 30px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 35px;
  flex: 1;
  place-self: center;

  &:hover {
    color: ${theme.colors.white};
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
  }
`;

const MusicIcon = styled.img`
  position: relative;
  flex: 1;
  place-self: center;
`;

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <MusicIcon src="/assets/music-icon.png" />
        <Paragraph>
          Seems like you don’t have any music yet! <br />
          Click the below button
        </Paragraph>
        <LinkButton to="/add-music">Add music</LinkButton>
      </Container>
    </ThemeProvider>
  );
};

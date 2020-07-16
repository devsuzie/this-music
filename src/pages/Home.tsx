import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

import EditModal from "@/Modals/EditModal";
import { useModalStore } from "@/store";

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

const Logo = styled.h1`
  font-family: ${theme.fonts.futura}, sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: ${theme.colors.highlight};
  width: 350px;
  margin: 0 0 50px 0;
  display: inline-block;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  width: 1200px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  font-size: 16px;
  padding: 50px 0;
`;

const PlayListContainer = styled.div`
  width: 350px;
  position: absolute;
  left: 0;
`;

const PlayListTitle = styled.h2`
  color: ${theme.colors.highlight};
  font-style: italic;
  font-size: 20px;
  font-weight: 200;
  width: calc(100% - 30px);
  border-bottom: 1px solid ${theme.colors.highlight};
  padding: 5px;
  margin: 0 0 15px 0;
`;

const PlayListUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PlayListLi = styled.li`
  display: block;
  color: ${theme.colors.white};
  font-weight: 100;
`;

const LiElement = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primaryDark};
  padding: 2px 15px;
  border-radius: 10px;
  margin: 5px 0;

  &:hover {
    background-color: ${theme.colors.active};
  }
`;

const MainContainer = styled.div`
  position: relative;
  width: calc(100% - 400px);
  float: right;
  margin-left: 50px;
`;

const SearchForm = styled.form``;

const InputSearch = styled.input`
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.white};
  border: none;
  line-height: 30px;
  height: 30px;
  border-radius: 10px;
  padding: 0 15px;
  min-width: 280px;
  margin: 5px 0 50px 0;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  color: ${theme.colors.highlight};
  border: none;
  background: none;
  font-size: 16px;
`;

const MusicCardUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  height: calc(100% - 50px);
  overflow: auto;
`;

const MusicCardLi = styled.li`
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.black};
  padding: 30px;
  margin: 10px 0;
  border-radius: 15px;
  width: calc(50% - 10px);
  display: inline-block;
  position: relative;

  &:nth-of-type(odd) {
    margin-right: 20px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
  }
`;

const MusicInfo = styled.div`
  position: relative;
  height: 130px;
`;

const AlbumCover = styled.img`
  width: 130px;
  height: 130px;
  position: absolute;
  left: 0;
`;

const DetailContainer = styled.div`
  width: calc(100% - 150px);
  margin-left: 20px;
  float: right;
  height: 130px;
  position: relative;
`;

const DetailEl = styled.span`
  font-size: 25px;
  font-weight: bold;
  display: block;
`;

const Date = styled.span`
  font-weight: bold;
  font-size: 13px;
  position: absolute;
  bottom: 0;
`;

const MusicDesc = styled.p`
  margin-bottom: 0;
`;

const AddLink = styled(Link)`
  font-family: ${theme.fonts.futura}, sans-serif;
  background-color: ${theme.colors.highlight};
  color: ${theme.colors.white};
  border-radius: 15px;
  display: inline-block;
  padding: 0 25px;
  margin: 5px 0 50px 0;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.white};
  }
`;

export default () => {
  const { openModal } = useModalStore();

  const playList = [
    {
      title: "전체 노래 목록",
    },
    {
      title: "6월에 들은 노래",
    },
    {
      title: "비올때 듣는 노래",
    },
    {
      title: "As Long As You Love me",
    },
    {
      title: "Sunny Day",
    },
  ];

  const musics = [
    {
      id: "1",
      singer: "King Gnu",
      title: "白日",
      date: "2020년 5월 3일",
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      desc:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
    },
    {
      id: "2",
      singer: "King Gnu",
      title: "白日",
      date: "2020년 5월 3일",
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      desc:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
    },
    {
      id: "3",
      singer: "King Gnu",
      title: "白日",
      date: "2020년 5월 3일",
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      desc:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
    },
    {
      id: "4",
      singer: "King Gnu",
      title: "白日",
      date: "2020년 5월 3일",
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      desc:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
    },
  ];

  const handleClick = () => {
    openModal(<EditModal key="edit-modal" />);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo>this.music</Logo>
        <PlayListContainer>
          <PlayListTitle>Playlist</PlayListTitle>
          <PlayListUl>
            {playList.map((list, index) => (
              <PlayListLi key={index}>
                <LiElement>{list.title}</LiElement>
              </PlayListLi>
            ))}
          </PlayListUl>
        </PlayListContainer>
        <MainContainer>
          <SearchForm>
            <InputSearch type="text" />
            <Button>search</Button>
          </SearchForm>
          <MusicCardUl>
            {musics.map((music, index) => (
              <MusicCardLi key={index} onClick={handleClick}>
                <MusicInfo>
                  <AlbumCover src={music.albumCover} />
                  <DetailContainer>
                    <DetailEl>{music.singer}</DetailEl>
                    <DetailEl>{music.title}</DetailEl>
                    <Date>{music.date}</Date>
                  </DetailContainer>
                </MusicInfo>
                <MusicDesc>{music.desc}</MusicDesc>
              </MusicCardLi>
            ))}
          </MusicCardUl>
          <AddLink to="/add-music">add</AddLink>
        </MainContainer>
      </Container>
    </ThemeProvider>
  );
};

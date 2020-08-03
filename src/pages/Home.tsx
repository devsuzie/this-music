import React, { useEffect, ReactNode, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

import EditModal from "@/Modals/EditModal";
import { useModalStore, useMusicsContext, usePlaylistsContext } from "@/store";
import { Playlist } from "@/store/Playlists";

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
  max-width: 1300px;
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

const PlaylistLi = styled.li`
  display: block;
  color: ${theme.colors.white};
  font-weight: 100;
`;

const StyledPlaylistItem = styled.span``;

const SelectInput = styled.input``;

const Label = styled.label`
  position: relative;
  width: 100%;
  margin: 0;
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
  margin-bottom: 20px;
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
  font-size: 20px;
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

interface MusicProps {
  musicId?: string;
  children: ReactNode;
}

interface PlaylistProps {
  playlist: Playlist;
  children: ReactNode;
}

const MusicLi: React.FC<MusicProps> = ({ musicId, children }) => {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal(<EditModal key="edit-modal" musicId={musicId} />);
  };

  return <MusicCardLi onClick={handleClick}>{children}</MusicCardLi>;
};

const PlaylistItem: React.FC<PlaylistProps> = ({ playlist, children }) => {
  const { state, ...actions } = useMusicsContext();

  const handleClick = useCallback(() => {
    actions.fetchAll(playlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions.fetchAll]);

  return (
    <StyledPlaylistItem onClick={handleClick} className="selectPlaylist">
      {children}
    </StyledPlaylistItem>
  );
};

export default () => {
  const { state, ...actions } = useMusicsContext();
  const { state: playlistSate, fetchPlaylists } = usePlaylistsContext();

  useEffect(() => {
    actions.fetchAll({ id: "0", name: "whole" });
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(() => {
    actions.fetchAll({ id: "0", name: "whole" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions.fetchAll]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo onClick={handleClick}>this.music</Logo>
        <PlayListContainer>
          <PlayListTitle>Playlist</PlayListTitle>
          <PlayListUl>
            <PlaylistLi key="0">
              <Label htmlFor="0">
                <SelectInput
                  type="radio"
                  id="0"
                  name="playlist"
                  value="0"
                  defaultChecked
                ></SelectInput>
                <StyledPlaylistItem
                  className="selectPlaylist"
                  onClick={handleClick}
                >
                  전체 목록
                </StyledPlaylistItem>
              </Label>
            </PlaylistLi>

            {playlistSate.playlists.map((p) => (
              <PlaylistLi key={p.id}>
                <Label htmlFor={p.id}>
                  <SelectInput
                    type="radio"
                    id={p.id}
                    name="playlist"
                    value={p.id}
                  ></SelectInput>
                  <PlaylistItem playlist={p}>{p.name}</PlaylistItem>
                </Label>
              </PlaylistLi>
            ))}
          </PlayListUl>
        </PlayListContainer>
        <MainContainer>
          <SearchForm>
            <InputSearch type="text" />
            <Button>search</Button>
          </SearchForm>
          <MusicCardUl>
            {state.musics &&
              state.musics.map((m, index) => (
                <MusicLi key={index} musicId={m.id}>
                  <MusicInfo>
                    <AlbumCover src={m.music.albumCover} />
                    <DetailContainer>
                      <DetailEl>{m.music.artist}</DetailEl>
                      <DetailEl>{m.music.title}</DetailEl>
                      <Date>{m.date}</Date>
                    </DetailContainer>
                  </MusicInfo>
                  <MusicDesc>{m.text}</MusicDesc>
                </MusicLi>
              ))}
          </MusicCardUl>
          <AddLink to="/add-music">add</AddLink>
        </MainContainer>
      </Container>
    </ThemeProvider>
  );
};

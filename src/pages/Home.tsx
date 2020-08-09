import React, { useEffect, ReactNode, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Greeting from "@/components/Greeting";
import EditModal from "@/Modals/EditModal";
import { useModalStore, useMusicsContext, usePlaylistsContext } from "@/store";
import { Playlist } from "@/store/Playlists";
import theme from "@/theme";

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

const AlbumCover = styled.img`
  width: 130px;
  height: 130px;
  position: absolute;
  left: 0;
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 1300px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  font-size: 16px;
  padding: 50px 0;
`;

const Date = styled.span`
  font-weight: bold;
  font-size: 13px;
  position: absolute;
  bottom: 0;
`;

const Label = styled.label`
  position: relative;
  width: 100%;
  margin: 0;
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

const MainContainer = styled.div`
  position: relative;
  width: calc(100% - 400px);
  float: right;
  margin-left: 50px;
  padding-top: 80px;
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

const MusicDesc = styled.p`
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 65px;
`;

const MusicInfo = styled.div`
  position: relative;
  height: 130px;
  margin-bottom: 20px;
`;

const PlayListContainer = styled.div`
  width: 350px;
  position: absolute;
  left: 0;
`;

const PlaylistLi = styled.li`
  display: block;
  color: ${theme.colors.white};
  font-weight: 100;
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

const PlaylistUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SelectInput = styled.input``;

const StyledPlaylistItem = styled.span``;

interface MusicProps {
  selectedPlaylist?: any;
  musicId?: string;
  children: ReactNode;
}

interface PlaylistProps {
  playlist: Playlist;
  children: ReactNode;
}

const MusicLi: React.FC<MusicProps> = ({
  musicId,
  selectedPlaylist,
  children,
}) => {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal(
      <EditModal
        key="edit-modal"
        musicId={musicId}
        selectedPlaylist={selectedPlaylist}
      />
    );
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

  const handleClickLogo = useCallback(() => {
    window.location.reload();
  }, []);

  const INITIAL_STATE = {
    id: "0",
    name: "whole",
  };

  const [selectedPlaylist, setSelectedPlaylist] = useState(INITIAL_STATE);

  const handleChange = useCallback(
    (e: any) => {
      playlistSate.playlists.forEach((p) => {
        if (p.id === e.target.value) {
          setSelectedPlaylist(p);
        } else if (e.target.value === "0") {
          setSelectedPlaylist(INITIAL_STATE);
        }
      });
    },
    [playlistSate.playlists, INITIAL_STATE]
  );

  return (
    <Container>
      <Logo onClick={handleClickLogo}>this.music</Logo>
      {state.musics ? (
        <>
          <PlayListContainer>
            <PlayListTitle>Playlist</PlayListTitle>
            <PlaylistUl>
              <PlaylistLi key="0">
                <Label htmlFor="0">
                  <SelectInput
                    type="radio"
                    id="0"
                    name="playlist"
                    value="0"
                    onChange={handleChange}
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

              {playlistSate.playlists &&
                playlistSate.playlists.map((p) => (
                  <PlaylistLi key={p.id}>
                    <Label htmlFor={p.id}>
                      <SelectInput
                        type="radio"
                        id={p.id}
                        name="playlist"
                        value={p.id}
                        onChange={handleChange}
                      ></SelectInput>
                      <PlaylistItem playlist={p}>{p.name}</PlaylistItem>
                    </Label>
                  </PlaylistLi>
                ))}
            </PlaylistUl>
          </PlayListContainer>
          <MainContainer>
            <MusicCardUl>
              {state.musics &&
                state.musics.map((m, index) => (
                  <MusicLi
                    key={index}
                    musicId={m.id}
                    selectedPlaylist={selectedPlaylist}
                  >
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
        </>
      ) : (
        <Greeting />
      )}
    </Container>
  );
};

import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import styled from "@emotion/styled";

import { useLoadingStore, useMusicsContext } from "@/store";

const theme = {
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

const SpinnerContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const SearchForm = styled.form``;

const InpuSearch = styled.input`
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.white};
  border: none;
  line-height: 30px;
  height: 30px;
  border-radius: 10px;
  padding: 0 15px;
  width: calc(100% - 105px);
  margin: 5px 10px 20px 0;
  display: inline-block;

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

const SearchedMusicUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 350px;
  overflow: scroll;
  padding-right: 15px;
`;

const SearchedMusicLi = styled.li`
  margin: 10px 0 25px 0;
  width: 100%;
  overflow: auto;
`;

const AlbumCover = styled.img`
  display: inline-block;
  width: 60px;
  height: 60px;
  float: left;
`;

const AlbumInfo = styled.p`
  display: inline-block;
  height: 60px;
  margin: 0 0 0 20px;
  width: calc(100% - 180px);
  float: left;
  padding-right: 20px;
`;

const AlbumInfoEl = styled.span`
  font-size: 20px;
  display: block;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SelectButton = styled.button`
  display: inline-block;
  color: ${theme.colors.highlight};
  border: none;
  background: none;
  font-size: 16px;
  padding: 0 20px;
  border: 1px solid ${theme.colors.highlight};
  border-radius: 30px;
  height: 30px;
  line-height: 30px;
  margin: 15px 0;
  width: 100px;
  float: left;

  &:hover {
    background-color: ${theme.colors.highlight};
    color: ${theme.colors.white};
  }
`;

type FormData = {
  music?: "string";
};

export default () => {
  const { state, ...actions } = useMusicsContext();
  const { register, handleSubmit } = useForm<FormData>();
  const {
    state: loadingState,
    finishLoading,
    startLoading,
  } = useLoadingStore();

  const onSubmit = handleSubmit(({ music = "" }) => {
    actions.clear();
    startLoading();
    actions
      .fetchMusic({ query: music })
      .then((res) => {
        finishLoading();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  });

  return (
    <>
      <SearchForm onSubmit={onSubmit}>
        <InpuSearch type="text" name="music" ref={register} />
        <Button>search</Button>
      </SearchForm>
      {loadingState.loading && (
        <SpinnerContainer>
          <Spinner animation="border" variant="light" />
        </SpinnerContainer>
      )}
      <SearchedMusicUl>
        {state.musics.map((searchedList, index) => (
          <SearchedMusicLi key={index}>
            <AlbumCover src={searchedList.albumCover} />
            <AlbumInfo>
              <AlbumInfoEl>{searchedList.title}</AlbumInfoEl>
              <AlbumInfoEl>{searchedList.artist}</AlbumInfoEl>
            </AlbumInfo>
            <SelectButton>select</SelectButton>
          </SearchedMusicLi>
        ))}
      </SearchedMusicUl>
    </>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ThemeProvider } from "emotion-theming";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import { formatDate, getDateByTimeZone } from "@/lib/date";
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

const StyledLink = styled(Link)`
  color: ${theme.colors.highlight};
  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const SpinnerContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  width: 1000px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  font-size: 16px;
  padding: 50px 0;
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

const AddMusicWrap = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const StepContainer = styled.div``;

const StepTitle = styled.h2`
  color: ${theme.colors.highlight};
  font-size: 20px;
  font-family: ${theme.fonts.futura}, sans-serif;
  margin-bottom: 20px;
`;

const Step1 = styled.div`
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.black};
  padding: 20px 40px;
  border-radius: 15px;
  margin-bottom: 120px;
`;

const SearchContainer = styled.div``;

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

const Step2 = styled.div`
  margin-bottom: 120px;
`;

const SelectBoxWrap = styled.div`
  position: relative;
`;

const SelectBox = styled.select`
  border: none;
  background: url(/assets/down-arrow.png) no-repeat 95% 60%;
  background-size: 16px 13px;
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  padding: 5px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: calc(80% - 40px);
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";

  &:focus {
    outline: none;
  }
`;

const DatePicker = styled.input`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  background: url(/assets/down-arrow.png) no-repeat 95% 60%;
  background-size: 16px 13px;
  background-color: ${theme.colors.primaryDark};
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  padding-right: 25px;
  ::-webkit-calendar-picker-indicator {
    background: ${theme.colors.primaryDark};
  }
`;

const Step3 = styled.div`
  margin-bottom: 120px;
`;

const TextArea = styled.textarea`
  resize: none;
  width: calc(100% - 60px);
  border: none;
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.black};
  border-radius: 30px;
  padding: 25px 30px;
  font-size: 16px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  line-height: 1.6em;

  &:focus {
    outline: none;
  }
`;

const SaveButton = styled.button`
  display: block;
  border: none;
  color: ${theme.colors.white};
  background-color: ${theme.colors.highlight};
  padding: 5px 30px;
  border-radius: 30px;
  font-size: 20px;
  font-family: ${theme.fonts.futura}, sans-serif;
  margin: 0 auto 100px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  min-width: 450px;
`;

type FormData = {
  music?: {
    albumCover?: string;
    albumId?: string;
    artist?: string;
    id?: string;
    title?: string;
  };
  category?: string;
  date?: any;
  desc: string;
};

export default () => {
  const { state, ...actions } = useMusicsContext();
  const { register, handleSubmit } = useForm<FormData>();
  const {
    state: loadingState,
    finishLoading,
    startLoading,
  } = useLoadingStore();

  const [musicQuery, setMusicQuery] = useState("");

  const INITIAL_STATE = {
    albumCover: "",
    albumId: "",
    artist: "",
    id: "",
    title: "",
  };
  const [music, setMusic] = useState(INITIAL_STATE);

  const handleChange = (e: any) => {
    setMusicQuery(e.target.value);
  };

  const handleClickSearch = (e: any) => {
    e.preventDefault();
    actions.clear();
    startLoading();
    actions
      .fetchMusic({ query: musicQuery })
      .then((res) => {
        finishLoading();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  const onSubmit = handleSubmit(({ desc, music, date }) => {
    state.musics.map((searchedList) => {
      if (searchedList.id === music) {
        console.log(searchedList);
      }
    });

    console.log(music, date, desc);
  });

  const zonedDateToday = getDateByTimeZone();
  const dateValue = formatDate(zonedDateToday);

  const [dateQuery, setDateQuery] = useState(dateValue);

  const handleChangeDate = (e: any) => {
    setDateQuery(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo>
          <StyledLink to="/">this.music</StyledLink>
        </Logo>

        <AddMusicWrap>
          <form onSubmit={onSubmit}>
            <StepContainer>
              <StepTitle>1. Search for music you want to add</StepTitle>
              <Step1>
                <SearchContainer>
                  <InpuSearch
                    type="text"
                    onChange={handleChange}
                    value={musicQuery}
                  />
                  <Button onClick={handleClickSearch}>search</Button>
                </SearchContainer>
                {loadingState.loading && (
                  <SpinnerContainer>
                    <Spinner animation="border" variant="light" />
                  </SpinnerContainer>
                )}
                <SearchedMusicUl>
                  {state.musics.map((searchedList) => (
                    <SearchedMusicLi key={searchedList.id}>
                      <Label htmlFor={searchedList.id}>
                        <AlbumCover src={searchedList.albumCover} />
                        <AlbumInfo>
                          <AlbumInfoEl>{searchedList.title}</AlbumInfoEl>
                          <AlbumInfoEl>{searchedList.artist}</AlbumInfoEl>
                        </AlbumInfo>
                      </Label>
                      <input
                        type="radio"
                        id={searchedList.id}
                        name="music"
                        ref={register}
                        value={searchedList.id}
                      ></input>

                      {/* <SelectButton onClick={clickMusicSelect}>
                        select
                      </SelectButton> */}
                    </SearchedMusicLi>
                  ))}
                </SearchedMusicUl>
              </Step1>
              <StepTitle>2. Sélect a Category & Date</StepTitle>
              <Step2>
                <SelectBoxWrap>
                  <SelectBox>
                    <option value="1" ref={register}>
                      option 1
                    </option>
                    <option value="2" ref={register}>
                      option 2
                    </option>
                    <option value="3" ref={register}>
                      option 3
                    </option>
                  </SelectBox>
                </SelectBoxWrap>
                <DatePicker
                  id="date"
                  name="date"
                  onChange={handleChangeDate}
                  type="date"
                  value={dateQuery}
                  ref={register}
                />
              </Step2>
              <StepTitle>3. Write Something!</StepTitle>
              <Step3>
                <TextArea cols={30} rows={10} name="desc" ref={register} />
              </Step3>
            </StepContainer>
            <SaveButton type="submit">Save It!</SaveButton>
          </form>
        </AddMusicWrap>
      </Container>
    </ThemeProvider>
  );
};

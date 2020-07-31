import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ThemeProvider } from "emotion-theming";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import CreatePlaylistModal from "@/Modals/CreatePlaylistModal";
import { formatDate, getDateByTimeZone } from "@/lib/date";
import {
  useLoadingStore,
  useModalStore,
  useMusicsContext,
  useSearchMusicContext,
  usePlaylistsContext,
} from "@/store";

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
  width: calc(100% - 175px);
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

const SelectInput = styled.input``;

let SelectButton = styled.span``;

const Step2 = styled.div`
  margin-bottom: 120px;
`;

const SelectBoxWrap = styled.div`
  position: relative;
`;

const SelectBox = styled.div`
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
  text-indent: 1px;
  text-overflow: "";
  cursor: pointer;
`;

const DatePicker = styled.input`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.avenir}, sans-serif;
  background-color: ${theme.colors.primaryDark};
  border: none;
  border-radius: 10px;
  padding: 5px 20px;

  ::-webkit-calendar-picker-indicator {
    background: ${theme.colors.primaryDark};
    background: url(/assets/down-arrow.png) no-repeat 95% 60%;
    background-size: 16px 13px;
  }
`;

const Step3 = styled.div`
  margin-bottom: 120px;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
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
  position: relative;
  width: 100%;
`;

type FormData = {
  musicId: string;
  playlist?: string;
  date?: any;
  text: string;
};

const OptionContainer = styled.div`
  background-color: #f2efef;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  padding-top: 15px;
  top: 45px;
  width: calc(80% - 40px);
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
`;

const Option = styled.div`
  color: ${theme.colors.black};
  height: 40px;
  line-height: 40px;
  padding: 0 30px;

  &: hover {
    color: ${theme.colors.active};
  }
`;

const AddOption = styled.div`
  color: ${theme.colors.black};
  height: 60px;
  line-height: 60px;
  border-top: 1px solid ${theme.colors.active};
  padding: 0 30px;
  padding-left: 60px;
  background: url(/assets/add-btn.png) no-repeat 5% 60%;
  background-size: 35px 35px;
  border-radius: 0 0 10px 10px;
  margin-top: 10px;

  &: hover {
    background-color: ${theme.colors.white};
  }
`;

export default () => {
  const { state, ...actions } = useSearchMusicContext();
  const { create, fetchAll } = useMusicsContext();
  const { state: playlistState, fetchPlaylists } = usePlaylistsContext();
  const { register, handleSubmit } = useForm<FormData>();
  const { openModal } = useModalStore();
  const {
    state: loadingState,
    finishLoading,
    startLoading,
  } = useLoadingStore();

  const history = useHistory();

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [musicQuery, setMusicQuery] = useState("");

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

  const zonedDateToday = getDateByTimeZone();
  const dateValue = formatDate(zonedDateToday);

  const [dateQuery, setDateQuery] = useState(dateValue);

  const handleChangeDate = (e: any) => {
    setDateQuery(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickSelectBox = () => {
    setOpen(!open);
  };

  const handleClickAddOption = () => {
    openModal(<CreatePlaylistModal key="create-playlist-modal" />);
  };

  const [playlist, setPlaylist] = useState("select playlist");

  const handleSelectOption = (e: any) => {
    // innerHTML 말고 다른 방식으로 playlist object 가져오도록..!
    setPlaylist(e.target.innerHTML);
    setOpen(false);
  };

  const onSubmit = handleSubmit(({ text, musicId, date }) => {
    state.musics.forEach((searchedList) => {
      if (searchedList.id === musicId) {
        const musics = {
          id: uuidv4(),
          music: {
            albumCover: searchedList.albumCover,
            albumId: searchedList.albumId,
            artist: searchedList.artist,
            id: searchedList.id,
            title: searchedList.title,
          },
          playlist: {
            id: 2,
            name: "playlist",
          },
          date,
          text,
        };

        create(musics);
      }
    });
    fetchAll("");
    history.push("/");
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo>
          <StyledLink to="/">this.music</StyledLink>
        </Logo>

        <AddMusicWrap>
          <Form onSubmit={onSubmit}>
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
                        <SelectInput
                          type="radio"
                          id={searchedList.id}
                          name="musicId"
                          ref={register({
                            required: true,
                          })}
                          value={searchedList.id}
                        ></SelectInput>
                        <SelectButton className="checkmark">
                          select
                        </SelectButton>
                      </Label>
                    </SearchedMusicLi>
                  ))}
                </SearchedMusicUl>
              </Step1>
              <StepTitle>2. Sélect a Category & Date</StepTitle>
              <Step2>
                <SelectBoxWrap>
                  <SelectBox onClick={handleClickSelectBox}>
                    {playlist}
                  </SelectBox>
                  {open && (
                    <OptionContainer>
                      <Option onClick={handleSelectOption}>
                        카테고리 선택안함
                      </Option>
                      {playlistState.playlists &&
                        playlistState.playlists.map((p) => (
                          <Option key={p.id} onClick={handleSelectOption}>
                            {p.name}
                          </Option>
                        ))}
                      <AddOption onClick={handleClickAddOption}>
                        Add playlist
                      </AddOption>
                    </OptionContainer>
                  )}
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
                <TextArea cols={30} rows={10} name="text" ref={register} />
              </Step3>
            </StepContainer>
            <SaveButton type="submit">Save It!</SaveButton>
          </Form>
        </AddMusicWrap>
      </Container>
    </ThemeProvider>
  );
};

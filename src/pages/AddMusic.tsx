import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

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
`;

const AlbumInfoEl = styled.span`
  font-size: 20px;
  display: block;
  height: 30px;
  line-height: 30px;
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

export default () => {
  const searchedLists = [
    {
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      singer: "King Gnu",
      title: "白日",
    },
    {
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      singer: "King Gnu",
      title: "白日",
    },
    {
      albumCover: "https://m.media-amazon.com/images/I/81FYXjViaHL._SS500_.jpg",
      singer: "King Gnu",
      title: "白日",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo>this.music</Logo>

        <AddMusicWrap>
          <StepContainer>
            <StepTitle>1. Search the music you want to add</StepTitle>
            <Step1>
              <SearchForm>
                <InpuSearch type="text" />
                <Button>search</Button>
              </SearchForm>
              <SearchedMusicUl>
                {searchedLists.map((searchedList) => (
                  <SearchedMusicLi>
                    <AlbumCover src={searchedList.albumCover} />
                    <AlbumInfo>
                      <AlbumInfoEl>{searchedList.singer}</AlbumInfoEl>
                      <AlbumInfoEl>{searchedList.title}</AlbumInfoEl>
                    </AlbumInfo>
                    <SelectButton>select</SelectButton>
                  </SearchedMusicLi>
                ))}
              </SearchedMusicUl>
            </Step1>
            <StepTitle>2. Sélect a Category & Date</StepTitle>
            <Step2>
              <SelectBoxWrap>
                <SelectBox>
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                </SelectBox>
              </SelectBoxWrap>
              <DatePicker type="date" value="2020-06-22" />
            </Step2>
            <StepTitle>3. Write Something!</StepTitle>
            <Step3>
              <TextArea cols={30} rows={10} />
            </Step3>
          </StepContainer>
          <SaveButton>Save It!</SaveButton>
        </AddMusicWrap>
      </Container>
    </ThemeProvider>
  );
};

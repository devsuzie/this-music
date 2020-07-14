import React from "react";
import styled from "@emotion/styled";

import { ModalBody, ModalHeader, Modal } from "../components/Modal";
import { useModalStore } from "../store";

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

const Title = styled.h3`
  font-family: ${theme.fonts.futura};
  font-weight: bold;
  color: ${theme.colors.highlight};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  border: none;
  text-indent: -99999px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(/assets/close-icon.png) no-repeat 50% 50%;
  background-size: 17px 17px;
  background-color: ${theme.colors.highlight};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  font-family: ${theme.fonts.futura}, sans-serif;
  font-size: 1.5em;
  background-color: ${theme.colors.highlight};
  color: ${theme.colors.white};
  border-radius: 35px;
  border: none;
  padding: 0 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: -65px;
  left: calc(50% - 80px);

  &:focus {
    outline: none;
  }
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.35);
`;

const StyledModalHeader = styled(ModalHeader)`
  padding: 40px;
  padding-bottom: 20px;
  background-color: ${theme.colors.primary};
  border-radius: 30px 30px 0 0;
`;

const StyledModalBody = styled(ModalBody)`
  padding: 20px 40px 60px;
  background-color: ${theme.colors.primary};
  border-radius: 0 0 30px 30px;
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
  margin-bottom: 20px;
  ::-webkit-calendar-picker-indicator {
    background: ${theme.colors.primaryDark};
  }
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

export default () => {
  const { closeModal } = useModalStore();

  function handleClose() {
    closeModal();
  }

  return (
    <StyledModal>
      <StyledModalHeader>
        <Title>Edit</Title>
      </StyledModalHeader>
      <StyledModalBody>
        <SelectBoxWrap>
          <SelectBox>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </SelectBox>
        </SelectBoxWrap>
        <DatePicker type="date" value="2020-06-22" />
        <TextArea cols={30} rows={10} />
        <SubmitButton>Save It!</SubmitButton>
      </StyledModalBody>
      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </StyledModal>
  );
};

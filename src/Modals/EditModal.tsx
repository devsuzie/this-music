import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import { ModalBody, ModalHeader, Modal } from "@/components/Modal";
import { formatDate, getDateByTimeZone } from "@/lib/date";
import { useModalStore, useMusicsContext, usePlaylistsContext } from "@/store";

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
  margin-bottom: 20px;

  ::-webkit-calendar-picker-indicator {
    background: ${theme.colors.primaryDark};
    background: url(/assets/down-arrow.png) no-repeat 95% 60%;
    background-size: 16px 13px;
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

const OptionContainer = styled.div`
  background-color: #f2efef;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  padding: 15px 0;
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

type FormData = {
  playlist?: string;
  date?: any;
  text?: string;
};

export default ({ musicId }: { musicId: string | undefined }) => {
  const { state, ...actions } = useMusicsContext();
  const { state: playlistState, fetchPlaylists } = usePlaylistsContext();
  const { closeModal } = useModalStore();
  const { register, reset, handleSubmit } = useForm<FormData>();

  const zonedDateToday = getDateByTimeZone();
  const dateValue = formatDate(zonedDateToday);

  const [open, setOpen] = useState(false);
  const [dateQuery, setDateQuery] = useState(dateValue);
  const [playlist, setPlaylist] = useState("");

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSelectBox = () => {
    setOpen(!open);
  };

  const handleSelectOption = (e: any) => {
    setPlaylist(e.target.innerHTML);
    setOpen(false);
  };

  const handleChangeDate = (e: any) => {
    setDateQuery(e.target.value);
  };

  function handleClose() {
    closeModal();
  }

  useEffect(() => {
    actions.fetchById(musicId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset({
      date: state.musicDetail.date,
      text: state.musicDetail.text,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.musicDetail]);

  const onSubmit = handleSubmit(({ date, text }) => {
    actions.update(musicId, { playlist, date, text });
    actions.fetchAll();
    closeModal();
  });

  return (
    <StyledModal>
      <StyledModalHeader>
        <Title>Edit</Title>
      </StyledModalHeader>
      <StyledModalBody>
        <Form onSubmit={onSubmit}>
          <SelectBoxWrap>
            <SelectBox onClick={handleClickSelectBox}>
              {playlist ? playlist : state.musicDetail.playlist}
            </SelectBox>
            {open && (
              <OptionContainer>
                <Option onClick={handleSelectOption}>카테고리 선택안함</Option>
                {playlistState.playlists &&
                  playlistState.playlists.map((p) => (
                    <Option key={p.id} onClick={handleSelectOption}>
                      {p.playlist}
                    </Option>
                  ))}
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
          <TextArea cols={30} rows={10} name="text" ref={register} />
          <SubmitButton>Save It!</SubmitButton>
        </Form>
      </StyledModalBody>
      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </StyledModal>
  );
};

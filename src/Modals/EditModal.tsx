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
  color: ${theme.colors.highlight};
`;

export default () => {
  const { closeModal } = useModalStore();

  function handleClose() {
    closeModal();
  }

  return (
    <Modal>
      <ModalHeader>
        <Title>Edit</Title>
      </ModalHeader>
      <ModalBody>
        <button onClick={handleClose}>닫기</button>
      </ModalBody>
    </Modal>
  );
};

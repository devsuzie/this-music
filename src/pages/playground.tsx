import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styled from "@emotion/styled";

import EditModal from "@/Modals/EditModal";
import { useModalStore } from "@/store";

const AddOption = styled.div`
  background-color: blue;
  color: white;
`;

const OptionContainer = styled.div`
  cursor: pointer;
`;

const Option = styled.div`
  background-color: black;
  color: white;
`;

const SelecBox = () => {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal(<EditModal key="edit-modal" />);
  };

  return (
    <OptionContainer>
      <Option>hello</Option>
      <AddOption onClick={handleClick}>Add playlist</AddOption>
    </OptionContainer>
  );
};

export default () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <div onClick={handleClick}>select option</div>
      {open && <SelecBox />}
    </Container>
  );
};

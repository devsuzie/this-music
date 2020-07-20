import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styled from "@emotion/styled";

const Option = styled.div`
  background-color: black;
  color: white;
`;

export default () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <div onClick={handleClick}>select option</div>
      {open && <Option>hello</Option>}
    </Container>
  );
};

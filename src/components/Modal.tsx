import React, { ReactNode } from "react";
import _noop from "lodash/noop";
import OriginModal from "react-bootstrap/Modal";

import { useModalStore } from "../store";

interface Props {
  children: ReactNode;
}

export const Modal: React.FC<{
  onHide?: (...args: any[]) => void;
  Header?: any;
}> = ({ children, onHide = _noop, ...restProps }) => {
  const { closeModal } = useModalStore();

  function handleHide() {
    onHide();
    closeModal();
  }

  return (
    <OriginModal
      backdrop={false}
      container={document.getElementById("root")}
      onHide={handleHide}
      show={true}
      centered
      {...restProps}
    >
      {children}
    </OriginModal>
  );
};

export const ModalHeader = ({ children, ...restProps }: Props) => (
  <OriginModal.Header {...restProps}>{children}</OriginModal.Header>
);
export const ModalBody = OriginModal.Body;
export const ModalFooter = OriginModal.Footer;

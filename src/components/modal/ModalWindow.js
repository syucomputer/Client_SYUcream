import React from "react";
import Modal from "react-modal";
import "./ModalWindow.css";

const ModalWindow = ({ isOpen, onRequestClose, children, className }) => {
  const defaultStyle = "modal-container"

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`${defaultStyle} ${className}`}
      overlayClassName="modal-background"
    >
      {children}
    </Modal>
  );
};

export default ModalWindow;
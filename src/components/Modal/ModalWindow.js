import React from 'react';
import Modal from 'react-modal';
import './ModalWindow.css';

const ModalWindow = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
            className="modal-container"
            overlayClassName="modal-background"
        >
            {children}
        </Modal>
    );
};

export default ModalWindow;

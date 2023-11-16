import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components"

const ModalBody = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  font-family: 'Roboto', sans-serif;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  padding: 20px;
  position: relative;
  animation-name: modalOpen;
  animation-duration: 0.5s;

  @keyframes modalOpen {
    from {opacity: 0; transform: translateY(-50px)}
    to {opacity: 1; transform: translateY(0)}
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5em;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <ModalBody onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
                <hr />
                <CloseButton onClick={onClose}>×</CloseButton>
            </ModalContent>
        </ModalBody>,
        document.body
    );
};

export default Modal;
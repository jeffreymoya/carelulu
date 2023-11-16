import React, {memo} from "react"
import styled from 'styled-components';

const ConfirmationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteConfirmation = ({ onConfirm, onCancel }) => (
    <>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this task?</p>
        <ConfirmationButton onClick={onConfirm}>Yes</ConfirmationButton>
        <ConfirmationButton onClick={onCancel}>No</ConfirmationButton>
    </>
);

export default memo(DeleteConfirmation)
import React from "react"
import styled from 'styled-components';

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

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;

  &:focus {
    border: 3px solid #555;
  }
`;

const AddTaskButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddTaskModal = ({name, onSubmit, onNameChange}) => {
    return (
        <ModalContent>
            <Input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter task name"
            />
            <AddTaskButton onClick={onSubmit}>Add Task</AddTaskButton>
        </ModalContent>
    );
};
import React, { useState } from 'react';
import {usePreloadedQuery} from "react-relay"
import {TasksQuery} from "../../relay/queries"
import styled from 'styled-components';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

const TaskListUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskListItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-style: ${props=> props.$done ? 'italic' : 'normal'};
    text-decoration: ${props => props.$done ? 'line-through' : 'none'};
  }
`;

const DeleteButton = styled.button`
  border: none;
  color: red;
  background: none;
  cursor: pointer;
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
  margin-bottom: 40px;
  transition: background-color 0.3s ease;
  width: 20em;
  &:hover {
    background-color: #0056b3;
  }
`;
const TaskList = ({ queryReference, handleCheckboxChange, handleAddTask, handleDeleteTask, handleEditTask }) => {
    const [editableTaskId, setEditableTaskId] = useState(null);
    const [taskName, setTaskName] = useState('');
    const preloadedQuery = usePreloadedQuery(TasksQuery, queryReference)

    const startEditing = (taskId, name) => {
        setEditableTaskId(taskId);
        setTaskName(name)
    };

    const stopEditing = () => {
        setEditableTaskId(null);
        setTaskName('')
    };

    const handleNameChange = (taskId, newName, done) => {
        handleEditTask(taskId, newName, done);
        stopEditing();
    };

    return (
        <TaskListContainer>
            <h2>Task List</h2>
            <TaskListUl>
                {preloadedQuery.tasks.map(task => (
                    <TaskListItem key={task.id} $done={task.done}>
                        {editableTaskId === task.id ? (
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                        handleNameChange(task.id, e.target.value, task.done);
                                        stopEditing();
                                    } else return true;
                                }}
                                onBlur={stopEditing}
                                autoFocus
                            />
                        ) : (
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => handleCheckboxChange(task.id)}
                                />
                                <span onClick={(e) => { e.stopPropagation(); startEditing(task.id, task.name); }}>{task.name}</span>
                            </label>
                        )}
                        <DeleteButton onClick={() => handleDeleteTask(task.id)}>x</DeleteButton>
                    </TaskListItem>
                ))}
            </TaskListUl>
            <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>
        </TaskListContainer>
    );
};

export default TaskList;